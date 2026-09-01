# Zen Green Theme UI Specification

## 1. Color Tokens
- **Primary green**: `#006B3C` - Used for app header, primary actions (Submit, Create), and strong emphasis.
- **Secondary green**: `#0B7A46` - Used for active tabs, focus accents, links, and hover states.
- **Pale green**: `#EAF6EF` - Used for selected items, success messages, and subtle section emphasis.
- **Page background**: `#F5F7F6` - A quiet near-white for the main application background.
- **Surface / cards**: `White` (`#FFFFFF`) with subtle border and restrained shadow.
- **Text**: Dark charcoal-green (e.g. `#1A2B22`), not pure black, for comfortable reading.
- **Error**: Dark red text and border; used for validation errors.
- **Warning**: Amber callout or badge; do not use as ordinary decoration.
- **Success**: Green confirmation with readable text; do not rely on color alone (use icons/text).

## 2. Typography and Spacing
- **Font**: Consistent modern sans-serif.
- **Labels**: Appear above controls, consistent font weight (e.g. 500 or 600) and spacing.
- **Spacing**: Use a consistent multiple-based spacing system (e.g., 4px, 8px, 16px, 24px).

## 3. Component Rules
- **Editable field**: White background with a clear neutral border. Focus state must use Secondary green (`#0B7A46`).
- **Read-only field**: Soft gray-green or warm ivory shading that is distinct from editable fields but remains readable.
- **Required fields**: Marked with a red asterisk `*`. This asterisk does not replace validation text.
- **Validation Messages**: Must appear immediately below the associated field (Dark red text).
- **Buttons**:
  - Primary: Solid Primary green background, white text.
  - Secondary: Outline style or lighter background.
  - Disabled: Visually distinct (grayed out) and unclickable.
  - Busy/Submit: Shows a busy state (spinner or loading text) and is disabled while processing.
- **Icons**: Every icon-only control requires an accessible label and tooltip (e.g. `aria-label`).
- **Keyboard accessibility**: Focus indicators must remain visible.

## 4. Screen Layouts

### 4.1 Development Requester Selection Screen
- **Elements**: TokTickIT title, short explanation text, Dropdown of active Requesters, "Continue" button.
- **States**: Loading state, Empty state (if no active requesters), Safe API-failure state.

### 4.2 Create Ticket Screen
- **Arrangement**: System-generated fields (Ticket No, Date) near the top. Classification fields (Category, Related System, Priority) grouped together. Summary and Description given full width. Attachments below main fields. Primary "Submit" action at the bottom.
- **Success State**: Clearly displays the generated Ticket Number (e.g., `TKT-2026-001234`) and a link to My Tickets.

### 4.3 My Tickets Screen
- **Controls**: Search bar, Category/Priority/Status Filters, Sorting dropdown, "Create Ticket" primary button, Pagination controls (Previous, Page numbers, Next).
- **List/Card**: Responsive table on desktop, cards on mobile. Includes Ticket Number, Summary, Category, Current Status, Last Updated.
- **States**: Loading skeleton/spinner, Empty state (you have no tickets), No-results state (no tickets match search), Failure state.

### 4.4 Requester Ticket Detail (View Mode)
- **Layout**: Read-only display of the ticket details.
- **Attachments**: Distinct section for managing attachments (upload, download active, soft-remove).

## 5. Responsive Requirements

| Viewport | Required Behavior |
|---|---|
| **Desktop (≥ 992 px)** | Multi-column layout as specified; content centered with a sensible maximum width. |
| **Tablet (768-991 px)** | Two-column layout where practical; Summary and Description receive enough width. |
| **Mobile (< 768 px)** | Fields stack vertically; buttons remain touch-friendly; no horizontal page scrolling. |
| **All sizes** | No clipped labels, overlapping messages, hidden buttons, or unreadable attachment names. |
