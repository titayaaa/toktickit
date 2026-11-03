import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ActionsTaken, ActionTakenItem, AssignableUser } from '../../components/ActionsTaken';

const mockPerformer = {
  id: 2,
  fullName: 'Alice Staff',
  email: 'alice@toktickit.com',
  role: 'IT_STAFF',
};

const mockAssignee = {
  id: 3,
  fullName: 'Bob Tech',
  email: 'bob@toktickit.com',
  role: 'IT_STAFF',
};

const mockActions: ActionTakenItem[] = [
  {
    id: 101,
    ticketId: 1,
    actionDateTime: '2026-11-01T10:00:00.000Z',
    actionDescription: 'Checked switch port 14 and isolated CRC error counter spike.',
    performedById: 2,
    assigneeId: 3,
    status: 'IN_PROGRESS',
    result: null,
    isFollowUpRequired: true,
    followUpNote: 'Awaiting vendor replacement patch cable tomorrow morning.',
    attachmentNotes: 'See switch-port-14.pcap',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
    performedBy: mockPerformer,
    assignee: mockAssignee,
  },
  {
    id: 102,
    ticketId: 1,
    actionDateTime: '2026-11-01T08:30:00.000Z',
    actionDescription: 'Initial triage and physical cable inspection in server room B.',
    performedById: 2,
    assigneeId: 2,
    status: 'COMPLETED',
    result: 'Cable tested with fluke tester; slight attenuation detected.',
    isFollowUpRequired: false,
    followUpNote: null,
    attachmentNotes: null,
    createdAt: '2026-11-01T08:30:00.000Z',
    updatedAt: '2026-11-01T09:00:00.000Z',
    performedBy: mockPerformer,
    assignee: mockPerformer,
  },
];

const mockAssignableStaff: AssignableUser[] = [
  { id: 2, fullName: 'Alice Staff', email: 'alice@toktickit.com', role: 'IT_STAFF' },
  { id: 3, fullName: 'Bob Tech', email: 'bob@toktickit.com', role: 'IT_STAFF' },
  { id: 4, fullName: 'Carol Admin', email: 'carol@toktickit.com', role: 'ADMINISTRATOR' },
];

describe('Actions Taken UI Suite (UI-01, UI-02, UI-03, DUP-01, A11Y-01)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    localStorage.setItem('token', 'mock_token_staff');

    // Default fetch mock for assignable staff
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('/api/users/assignable')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockAssignableStaff,
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
      } as Response);
    });
  });

  it('UI-01: renders the Actions Taken section with items, badges, actors, and resolution warning banner', async () => {
    render(
      <ActionsTaken
        ticketId={1}
        actions={mockActions}
        currentUserRole="IT_STAFF"
        currentUserId={2}
      />
    );

    // Header & Count
    await waitFor(() => {
      expect(screen.getByText('Actions Taken')).toBeInTheDocument();
      expect(screen.getByTestId('actions-taken-count')).toHaveTextContent('2');
    });

    // Resolution Warning Banner (since 1 action is IN_PROGRESS)
    const warning = screen.getByTestId('actions-resolution-warning');
    expect(warning).toBeInTheDocument();
    expect(warning).toHaveTextContent('1 action(s) in progress');

    // Card items
    expect(screen.getByTestId('action-card-101')).toBeInTheDocument();
    expect(screen.getByTestId('action-card-102')).toBeInTheDocument();

    // Badges & text
    expect(screen.getByTestId('action-status-badge-IN_PROGRESS')).toHaveTextContent('IN_PROGRESS');
    expect(screen.getByTestId('action-status-badge-COMPLETED')).toHaveTextContent('COMPLETED');
    expect(screen.getByTestId('action-description-101')).toHaveTextContent('Checked switch port 14');
    expect(screen.getByTestId('action-result-102')).toHaveTextContent('Cable tested with fluke tester');

    // Follow-up & attachment notes
    expect(screen.getByTestId('action-followup-101')).toHaveTextContent('Follow-Up Required');
    expect(screen.getByTestId('action-followup-101')).toHaveTextContent('Awaiting vendor replacement patch cable');
    expect(screen.getByTestId('action-attachment-notes-101')).toHaveTextContent('switch-port-14.pcap');
  });

  it('UI-01 (Empty State): renders empty state message when no actions exist', async () => {
    render(
      <ActionsTaken
        ticketId={1}
        actions={[]}
        currentUserRole="IT_STAFF"
        currentUserId={2}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('actions-taken-count')).toHaveTextContent('0');
      expect(screen.getByTestId('actions-taken-empty')).toHaveTextContent('No Actions Taken recorded yet.');
    });
    expect(screen.queryByTestId('actions-resolution-warning')).not.toBeInTheDocument();
  });

  it('UI-03: hides Add/Edit/Status buttons for Requester role (read-only mode)', async () => {
    render(
      <ActionsTaken
        ticketId={1}
        actions={mockActions}
        currentUserRole="REQUESTER"
        currentUserId={10}
      />
    );

    // Cards are visible
    expect(screen.getByTestId('action-card-101')).toBeInTheDocument();
    expect(screen.getByTestId('action-card-102')).toBeInTheDocument();

    // Controls are hidden
    expect(screen.queryByTestId('add-action-taken-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-edit-101')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-complete-101')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-cancel-status-101')).not.toBeInTheDocument();
  });

  it('UI-02: opens Create modal, validates mandatory fields, and successfully posts new action', async () => {
    const onActionsChangeMock = vi.fn();

    const createdAction = {
      id: 103,
      ticketId: 1,
      actionDateTime: '2026-11-01T11:00:00.000Z',
      actionDescription: 'Re-crimped RJ45 modular jack on wall outlet.',
      performedById: 2,
      assigneeId: 2,
      status: 'PENDING',
      result: null,
      isFollowUpRequired: false,
      followUpNote: null,
      attachmentNotes: null,
      createdAt: '2026-11-01T11:00:00.000Z',
      updatedAt: '2026-11-01T11:00:00.000Z',
      performedBy: mockPerformer,
      assignee: mockPerformer,
    };

    ((globalThis as any).fetch as any).mockImplementation((url: string, opts: any) => {
      if (String(url).includes('/api/users/assignable')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockAssignableStaff,
        } as Response);
      }
      if (String(url).includes('/api/tickets/1/actions-taken') && opts?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          status: 201,
          json: async () => createdAction,
        } as Response);
      }
      return Promise.resolve({ ok: true, json: async () => ({}) } as Response);
    });

    render(
      <ActionsTaken
        ticketId={1}
        actions={[]}
        currentUserRole="IT_STAFF"
        currentUserId={2}
        onActionsChange={onActionsChangeMock}
      />
    );

    // Click "+ Add Action Taken"
    const addBtn = screen.getByTestId('add-action-taken-btn');
    fireEvent.click(addBtn);

    expect(screen.getByTestId('action-taken-form')).toBeInTheDocument();

    // Attempt to submit empty form -> triggers validation errors
    const saveBtn = screen.getByTestId('action-save');
    fireEvent.click(saveBtn);

    expect(await screen.findByTestId('action-description-error')).toHaveTextContent('Action description is required.');

    // Fill valid data
    const descInput = screen.getByTestId('action-description-input');
    fireEvent.change(descInput, { target: { value: 'Re-crimped RJ45 modular jack on wall outlet.' } });

    // Submit valid form
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('action-taken-form')).not.toBeInTheDocument();
      expect(screen.getByTestId('action-card-103')).toBeInTheDocument();
      expect(onActionsChangeMock).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: 103, actionDescription: 'Re-crimped RJ45 modular jack on wall outlet.' }),
      ]));
    });
  });

  it('UI-02 & DUP-01: validates Follow-up Note when toggle is on and disables save button during submission', async () => {
    let resolvePost: (val: any) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePost = resolve;
    });

    ((globalThis as any).fetch as any).mockImplementation((url: string, opts: any) => {
      if (String(url).includes('/api/users/assignable')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockAssignableStaff,
        } as Response);
      }
      if (String(url).includes('/api/tickets/1/actions-taken') && opts?.method === 'POST') {
        return pendingPromise;
      }
      return Promise.resolve({ ok: true, json: async () => ({}) } as Response);
    });

    render(
      <ActionsTaken
        ticketId={1}
        actions={[]}
        currentUserRole="IT_STAFF"
        currentUserId={2}
      />
    );

    fireEvent.click(screen.getByTestId('add-action-taken-btn'));

    const descInput = screen.getByTestId('action-description-input');
    fireEvent.change(descInput, { target: { value: 'Inspected IDF rack temperatures.' } });

    // Toggle follow-up required ON
    const toggle = screen.getByTestId('action-followup-toggle');
    fireEvent.click(toggle);

    // Follow-up note input appears
    const noteInput = screen.getByTestId('action-followup-note-input');
    expect(noteInput).toBeInTheDocument();

    // Attempt save without note -> validation error
    fireEvent.click(screen.getByTestId('action-save'));
    expect(await screen.findByTestId('action-followup-note-error')).toHaveTextContent('Follow-up note is mandatory');

    // Fill follow-up note
    fireEvent.change(noteInput, { target: { value: 'Monitor ambient temperature logs for 48 hours.' } });

    // Click Save -> check DUP-01 double submit disable state
    const saveBtn = screen.getByTestId('action-save');
    fireEvent.click(saveBtn);

    expect(saveBtn).toBeDisabled();
    expect(saveBtn).toHaveTextContent('Saving…');

    // Resolve in-flight request
    resolvePost!({
      ok: true,
      status: 201,
      json: async () => ({
        id: 104,
        ticketId: 1,
        actionDateTime: '2026-11-01T12:00:00.000Z',
        actionDescription: 'Inspected IDF rack temperatures.',
        performedById: 2,
        assigneeId: 2,
        status: 'PENDING',
        result: null,
        isFollowUpRequired: true,
        followUpNote: 'Monitor ambient temperature logs for 48 hours.',
        attachmentNotes: null,
        createdAt: '2026-11-01T12:00:00.000Z',
        updatedAt: '2026-11-01T12:00:00.000Z',
        performedBy: mockPerformer,
        assignee: mockPerformer,
      }),
    });

    await waitFor(() => {
      expect(screen.queryByTestId('action-taken-form')).not.toBeInTheDocument();
      expect(screen.getByTestId('action-card-104')).toBeInTheDocument();
    });
  });

  it('A11Y-01: supports Escape key to close modal and uses accessible touch targets >= 44px', async () => {
    render(
      <ActionsTaken
        ticketId={1}
        actions={mockActions}
        currentUserRole="IT_STAFF"
        currentUserId={2}
      />
    );

    const addBtn = screen.getByTestId('add-action-taken-btn');
    expect(addBtn).toHaveStyle({ minHeight: '44px' });

    fireEvent.click(addBtn);
    expect(screen.getByTestId('action-taken-form')).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByTestId('action-taken-form')).not.toBeInTheDocument();
    });
  });

  it('UI-02: quick Complete and Cancel status actions trigger PATCH endpoint', async () => {
    const onActionsChangeMock = vi.fn();

    const patchMock = vi.fn().mockImplementation((url: string, opts: any) => {
      if (String(url).includes('/api/users/assignable')) {
        return Promise.resolve({ ok: true, json: async () => mockAssignableStaff } as Response);
      }
      const body = JSON.parse(opts.body);
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ...mockActions[0],
          status: body.status,
        }),
      } as Response);
    });
    (globalThis as any).fetch = patchMock;

    render(
      <ActionsTaken
        ticketId={1}
        actions={[mockActions[0]]}
        currentUserRole="IT_STAFF"
        currentUserId={2}
        onActionsChange={onActionsChangeMock}
      />
    );

    // Cancel action button
    const cancelBtn = screen.getByTestId('action-cancel-status-101');
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(patchMock).toHaveBeenCalledWith(
        '/api/tickets/1/actions-taken/101',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ status: 'CANCELLED' }),
        })
      );
      expect(onActionsChangeMock).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: 101, status: 'CANCELLED' }),
      ]));
    });
  });

  it('UI-02: verifies Edit modal filters Status by State Machine and uses toktickit_auth_token', async () => {
    localStorage.clear();
    localStorage.setItem('toktickit_auth_token', 'custom_jwt_staff_token');

    let capturedAuthHeader = '';
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string, opts: any) => {
      if (String(url).includes('/api/users/assignable')) {
        capturedAuthHeader = opts?.headers?.Authorization || '';
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockAssignableStaff,
        } as Response);
      }
      return Promise.resolve({ ok: true, json: async () => ({}) } as Response);
    });

    render(
      <ActionsTaken
        ticketId={1}
        actions={[mockActions[0]]}
        currentUserRole="IT_STAFF"
        currentUserId={2}
      />
    );

    await waitFor(() => {
      expect(capturedAuthHeader).toBe('Bearer custom_jwt_staff_token');
    });

    // Open Edit modal for IN_PROGRESS action
    const editBtn = screen.getByTestId('action-edit-101');
    fireEvent.click(editBtn);

    expect(screen.getByTestId('action-taken-form')).toBeInTheDocument();

    // Verify State Machine filtering: IN_PROGRESS can transition to IN_PROGRESS, COMPLETED, CANCELLED, but NOT PENDING
    const statusSelect = screen.getByTestId('action-status-select') as HTMLSelectElement;
    expect(statusSelect).not.toBeDisabled();
    const options = Array.from(statusSelect.options).map((opt) => opt.value);
    expect(options).not.toContain('PENDING');
    expect(options).toEqual(['IN_PROGRESS', 'COMPLETED', 'CANCELLED']);

    // Cancel modal
    fireEvent.click(screen.getByTestId('action-form-cancel'));

    // Trigger quick complete on action without result -> opens modal preset to COMPLETED without locking select
    const completeBtn = screen.getByTestId('action-complete-101');
    fireEvent.click(completeBtn);

    expect(screen.getByTestId('action-taken-form')).toBeInTheDocument();
    const statusSelectAfterQuick = screen.getByTestId('action-status-select') as HTMLSelectElement;
    expect(statusSelectAfterQuick.value).toBe('COMPLETED');
    expect(statusSelectAfterQuick).not.toBeDisabled();
  });
});
