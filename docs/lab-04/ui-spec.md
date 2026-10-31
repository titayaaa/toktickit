# Sprint 4 UI Specification: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Design System Tokens: Zen Green
TokTickIT preserves the Zen Green design system established in Labs 2 and 3, ensuring unified visual harmony across all views.

```css
:root {
  /* Brand Primary Colors */
  --zen-primary: #15803d;         /* Forest green 700 */
  --zen-primary-hover: #166534;   /* Forest green 800 */
  --zen-primary-light: #dcfce7;   /* Green 100 */
  --zen-primary-subtle: #f0fdf4;  /* Green 50 */
  
  /* Ticket Status Badges (Paired Background and Text - WCAG 2.1 AA Compliant >= 4.5:1) */
  --status-new-bg: #f0f9ff;          /* Sky 50 */
  --status-new-text: #0369a1;        /* Sky 700 */
  --status-open-bg: #eff6ff;         /* Blue 50 */
  --status-open-text: #1e40af;        /* Blue 800 */
  --status-in-progress-bg: #fffbeb;  /* Amber 50 */
  --status-in-progress-text: #92400e;/* Amber 800 */
  --status-waiting-bg: #faf5ff;      /* Purple 50 */
  --status-waiting-text: #6b21a8;    /* Purple 800 */
  --status-pending-bg: #fefce8;      /* Yellow 50 */
  --status-pending-text: #854d0e;    /* Yellow 800 */
  --status-resolved-bg: #f0fdf4;     /* Green 50 */
  --status-resolved-text: #166534;   /* Green 800 */
  --status-closed-bg: #f8fafc;       /* Slate 50 */
  --status-closed-text: #334155;     /* Slate 700 */
  --status-reopened-bg: #fdf4ff;     /* Fuchsia 50 */
  --status-reopened-text: #86198f;   /* Fuchsia 800 */
  --status-cancelled-bg: #fef2f2;    /* Red 50 */
  --status-cancelled-text: #991b1b;  /* Red 800 */
  
  /* Actions Taken Status Badges (Paired Background and Text - WCAG 2.1 AA Compliant >= 4.5:1) */
  --action-pending-bg: #fffbeb;      /* Amber 50 */
  --action-pending-text: #92400e;    /* Amber 800 */
  --action-in-progress-bg: #eff6ff;  /* Blue 50 */
  --action-in-progress-text: #1e40af;/* Blue 800 */
  --action-completed-bg: #f0fdf4;    /* Green 50 */
  --action-completed-text: #166534;  /* Green 800 */
  --action-cancelled-bg: #fef2f2;    /* Red 50 */
  --action-cancelled-text: #991b1b;  /* Red 800 */
  
  /* Follow-Up Warning */
  --followup-bg: #fffbeb;         /* Amber 50 */
  --followup-border: #fcd34d;     /* Amber 300 */
  --followup-text: #92400e;       /* Amber 800 */

  /* Neutral Backgrounds & Borders */
  --bg-page: #f8fafc;             /* Slate 50 */
  --bg-card: #ffffff;             /* Pure white */
  --border-subtle: #e2e8f0;       /* Slate 200 */
  --text-main: #0f172a;           /* Slate 900 */
  --text-muted: #64748b;          /* Slate 500 */
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## 2. IT Staff Dashboard UI

### 2.1 Operational Metrics Row
A 4-card responsive grid presenting authoritative operational counts:
1. **Unassigned Tickets:** Card with icon and bold count. Clicking drills down to Staff Queue filtered with `ownerId=unassigned`.
2. **My Assigned Tickets:** Count of open/in-progress tickets where `ownerId == currentUser.id`. Clicking drills down to Staff Queue with `ownerId=me`.
3. **Urgent Tickets:** High-contrast red/amber indicator for tickets with `itPriority == URGENT`. Clicking filters Staff Queue by `itPriority=URGENT`.
4. **My Pending Actions:** Count of Actions Taken assigned to current user in `PENDING` or `IN_PROGRESS` status. Clicking navigates to assigned actions.

### 2.2 Urgent Tickets & My Pending Actions Grid
- **Left Column: Urgent Tickets List:** Compact table/cards showing Ticket Number, Summary, IT Priority, Time elapsed, and quick "Open Ticket" button.
- **Right Column: My Actions Taken:** Cards displaying Ticket Number, Action Description, Status badge, and Action Date.

---

## 3. Requester Dashboard UI

### 3.1 Personal Metrics Row
A 4-card responsive grid tailored strictly to the requester's owned tickets:
1. **Total Open Tickets:** Count of active tickets. Clicking navigates to My Tickets filtered by active status.
2. **Waiting for Your Input:** Highlighted in purple for tickets with status `WAITING_FOR_REQUESTER`. Clicking immediately navigates to ticket details to resolve blocker.
3. **Recently Updated:** Tickets modified within the last 7 days.
4. **Resolved Tickets:** Count of successfully resolved issues.

### 3.2 Action Required & Recent Activity List
- **Action Required Banner:** Displays prominent banner if any ticket is waiting for the requester's response, with direct button to reply.
- **Recent Tickets Timeline:** 5 most recently updated tickets with status badges and one-click view detail buttons.

---

## 4. Actions Taken Section on Ticket Detail

### 4.1 Layout and Position
Located immediately below the Ticket summary and above/beside the communication timelines:
- **Header:** Title "Actions Taken", badge showing total actions count, and "+ Add Action Taken" primary button (visible to IT Staff/Admin only).
- **Resolution Warning Banner:** If the ticket is in progress and has pending actions, an amber advisory badge appears: *"2 action(s) in progress. Complete or cancel all actions before resolving ticket."*
- **Timeline / Card List:**
  - **Date/Time Stamp:** Formatted local date and time.
  - **Status Badge:** High-contrast badges (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
  - **Actors:** "Performed by: [Staff Name]" and "Assigned to: [Assignee Name]".
  - **Description & Result:** Clear typography distinguishing action taken from observed outcome (result shown once completed).
  - **Follow-up Callout:** If `isFollowUpRequired` is true, an amber banner displays "Follow-Up Required" along with the `followUpNote`.
  - **Attachment Notes:** Italicized reference note guiding staff to relevant attachments if provided.
  - **Actions Dropdown / Edit Button:** Allows IT Staff to edit description, result, or change status.
- **Create / Edit Modal Form:**
  - **Assignee Dropdown:** Displays only active IT Staff and Administrator accounts. Inactive accounts are filtered out.
  - **Status Selector:** Radio or Select with `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.
  - **Dynamic Result Field:** When `COMPLETED` is selected, `Result` is marked as required with a red asterisk.
  - **Dynamic Follow-up Note:** When `Follow-up Required` is toggled on, the `Follow-up Note` textarea is revealed with mandatory validation.
- **Requester Read-Only View:** For Requesters, all actions taken are clearly visible for transparency, but add/edit buttons and action dropdowns are omitted.

---

## 5. Responsive Breakpoints & Viewport Rules

| Viewport | Screen Width | Dashboard Grid | Actions Taken View |
| :--- | :--- | :--- | :--- |
| **Desktop** | `>= 1024px` | 4-column metric cards; 2-column detailed lists | Structured table or dual-column timeline cards with full metadata |
| **Tablet** | `768px - 1023px` | 2-column metric cards; stacked detailed lists | Single-column card view; compact action badges |
| **Mobile** | `< 768px` | 1-column vertically stacked metric cards | Full-width vertical cards; touch-friendly 44px hit targets; no horizontal overflow |

---

## 6. Accessibility & Visual Polish Checklist (To be verified during implementation)
- [ ] High contrast ratios exceeding WCAG 2.1 AA standards (minimum 4.5:1 for normal text on all badges).
- [ ] Visible keyboard focus outlines (`outline: 2px solid var(--zen-primary)`).
- [ ] Screen-reader semantic labels on all icon-only buttons and status badges.
- [ ] Modal dialogs trap focus and support closing via `Esc` key.
- [ ] Forms display field-level validation errors in red immediately below the input.
- [ ] Zero horizontal scrolling on standard mobile widths (320px - 414px).
