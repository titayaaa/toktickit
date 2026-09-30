# Sprint 3 UI Specification: Zen Green Design System Extensions

## 1. Design System Foundations & Tokens

This specification extends the Zen Green design system established in Lab 2. All views and components must strictly adhere to these color tokens and typography standards.

### 1.1 Color Tokens
| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `--color-primary` | `#006B3C` | Navbar background, Primary CTA buttons (Sign In, Save, Claim) |
| `--color-primary-hover` | `#005430` | Hover state for primary buttons |
| `--color-secondary` | `#0B7A46` | Active tab indicators, focus rings, interactive text links |
| `--color-pale-container` | `#EAF6EF` | Public Comments bubble background, success alert boxes |
| `--color-surface` | `#FFFFFF` | Card surfaces, modal dialog backgrounds, input field backgrounds |
| `--color-background` | `#F5F7F6` | Global page viewport background |
| `--color-text` | `#1A2E23` | High-contrast body typography, table headers, labels |
| `--color-text-muted` | `#5A6E63` | Timestamps, secondary subtitles, placeholder text |
| `--color-border` | `#DCE3DE` | Subtle card borders, divider lines, table cell outlines |
| `--color-danger` | `#D32F2F` | Error banners, validation callouts, deactivation buttons |
| `--color-danger-bg` | `#FFEBEE` | Background for error banners and invalid input highlights |
| `--color-note-bg` | `#FFF8E1` | Background container for Internal Notes (Amber Tint) |
| `--color-note-border` | `#FFA000` | Border and lock icon color for Internal Notes |
| `--color-note-text` | `#5D4037` | Body text for Internal Notes |

### 1.2 Role Badge Styling
*Note: Roles are represented internally as Enums (`REQUESTER`, `IT_STAFF`, `ADMINISTRATOR`) and rendered in the UI with Title Case labels.*

| Role Enum | UI Display Label | Background | Text Color | Border |
| :--- | :--- | :--- | :--- | :--- |
| `REQUESTER` | Requester | `#E8F5E9` | `#2E7D32` | `1px solid #A5D6A7` |
| `IT_STAFF` | IT Staff | `#E3F2FD` | `#1565C0` | `1px solid #90CAF9` |
| `ADMINISTRATOR` | Administrator | `#EDE7F6` | `#512DA8` | `1px solid #B39DDB` |

### 1.3 Ticket Status Badges
| Status Enum | UI Display Label | Background | Text Color |
| :--- | :--- | :--- | :--- |
| `NEW` | New | `#E3F2FD` | `#0D47A1` |
| `OPEN` | Open | `#E8F5E9` | `#1B5E20` |
| `IN_PROGRESS` | In Progress | `#FFF3E0` | `#E65100` |
| `WAITING_FOR_REQUESTER` | Waiting for Requester | `#EDE7F6` | `#4A148C` |
| `RESOLVED` | Resolved | `#E0F2F1` | `#004D40` |
| `CLOSED` | Closed | `#ECEFF1` | `#37474F` |
| `REOPENED` | Reopened | `#FBE9E7` | `#BF360C` |
| `CANCELLED` | Cancelled | `#EEEEEE` | `#424242` |

---

## 2. Application Shell & Navigation

### 2.1 Navigation Bar (Zen Green Navbar)
- **Brand Identity:** Left-aligned TokTickIT logo with Zen Green leaf/ticket icon.
- **Role-Aware Navigation Links:**
  - `REQUESTER`: "Create Ticket", "My Tickets"
  - `IT_STAFF`: "Ticket Queue", "Create Ticket"
  - `ADMINISTRATOR`: "Ticket Queue", "User Management", "Create Ticket"
- **User Profile Menu (Right-aligned):**
  - Displays authenticated user's `fullName` and Role Badge.
  - Dropdown options: "Change Password" and "Sign Out".

---

## 3. Screen Specifications

### 3.1 Login Screen (`/login`)
- Centered card container (max-width: 420px) on `#F5F7F6` background.
- Clean header: TokTickIT branding, "Sign In to Your Account".
- Fields:
  - Email Address (type `email`, auto-focus, validation for format).
  - Password (type `password`, show/hide password toggle button).
- Actions: Full-width Primary Button "Sign In" with busy loading spinner state.
- Error Handling: Inline error banner above fields displaying "Invalid email or password" (safe message for nonexistent or inactive accounts).

### 3.2 Mandatory Password Change Dialog (`/change-password`)
- Displayed immediately upon login when `mustChangePassword = true` or accessed via Profile menu.
- Non-dismissible overlay modal if triggered by first-login requirement.
- Fields:
  - Current (Temporary) Password.
  - New Password.
  - Confirm New Password.
- Real-time Complexity Checklist:
  - [x] At least 8 characters long
  - [x] At least one uppercase letter (A-Z)
  - [x] At least one lowercase letter (a-z)
  - [x] At least one numeric digit (0-9)
- Action: "Update Password & Continue" button (disabled until all checklist items are satisfied and confirmation matches).

### 3.3 IT Staff Ticket Queue (`/staff/queue`)
- **Header Section:** "IT Staff Ticket Queue" title, total ticket counter badge, and quick search input (searches Ticket Number and Summary).
- **Filter Bar:**
  - Status dropdown (All, New, Open, In Progress, Waiting for Requester, Resolved, Closed).
  - IT Priority dropdown (All, Low, Medium, High, Urgent).
  - Category dropdown.
  - Assignment filter: "All Tickets", "Assigned to Me", "Unassigned".
- **Data Table Layout (Desktop >1024px):**
  - Columns: Ticket No (monospace link), Created At, Summary, Category, Requested Priority, IT Priority, Status Badge, Owner.
  - Hover highlight on rows (`#F9FAF9`), clickable row opens Ticket Detail.
- **Responsive Representation:**
  - Tablet (768px-1024px): Compact columns; secondary metadata collapsed.
  - Mobile (<768px): Card-based queue list; each card displays Ticket No, Status, Summary, Priority, and Owner with touch-friendly targets.
- **Pagination Controls:** Previous, Next buttons with page indicators (`Showing 1-10 of 45 tickets`).

### 3.4 Operational Ticket Detail View (`/tickets/:id`)
- **Overview Card:** Displays read-only Ticket Number, Created Date, Requester info, Category, and Related System.
- **Operational Toolbar (IT Staff / Admin only):**
  - "Claim Ticket" button (visible if unassigned; assigns to current user and transitions `NEW` -> `OPEN`).
  - Owner dropdown: Reassign ticket to another IT Staff.
  - IT Priority dropdown: Update operational priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
  - Status transition dropdown: Restricted strictly to permitted transitions based on transition matrix.
  - Resolution Modal: Triggered when selecting `RESOLVED`; requires mandatory `resolutionSummary` input textarea (3-500 characters).
- **Communication Section (Tabbed or Split View):**
  - **Tab 1: Public Comments:**
    - Timeline of append-only comments.
    - Soft green bubble styling (`#EAF6EF`).
    - Author avatar, full name, role badge, timestamp.
    - Comment submission form: Textarea with character count and "Post Public Comment" button.
    - For Requesters: "Mark Issue as Appears Resolved" toggle/button.
  - **Tab 2: Internal Notes (IT Staff & Admin only):**
    - Distinct amber styling (`#FFF8E1` background, `#FFA000` border).
    - Prominent lock icon (`🔒`) and banner: "Confidential: Visible only to IT Staff and Administrators".
    - Note submission form with "Save Internal Note" button.

### 3.5 Administrator User Management Screen (`/admin/users`)
- **Header:** "User Management" title, "+ Create New User" action button.
- **Search & Filter:** Search by name or email; filter by Role (`REQUESTER`, `IT_STAFF`, `ADMINISTRATOR`).
- **User Roster Table:**
  - Columns: Name, Email, Role Badge, Status Badge (Active/Inactive), Actions ("Edit", "Reset Password").
- **Create / Edit User Slide-over Panel:**
  - Full Name (required, 2-100 characters).
  - Email Address (required, valid email format).
  - Role selection (Radio buttons or Select: Requester, IT Staff, Administrator).
  - Active Status switch (toggle: Active / Inactive).
    - Disabled if admin attempts to deactivate their own account or the last active admin.
  - Initial Password field (for create mode, automatically sets `mustChangePassword = true`).
  - Form validation with inline error messages and "Save User" CTA.

---

## 4. Completed Visual Checklist for Design Consistency & Responsive Audit

Following Section 14 (Answer Part 9) of the Lab 3 Specification, all screens have been verified across Desktop (1280px), Tablet (768px), and Mobile (375px):

| Visual Quality Item | Target Requirement | Verification Method | Status | Observations / Compliance Notes |
| :--- | :--- | :--- | :---: | :--- |
| **Design Consistency** | Reuse Zen Green tokens (`#006B3C`, `#EAF6EF`, `#1A2E23`) without arbitrary ad-hoc colors | Automated CSS lint & Visual audit | ✅ Passed | Color tokens match Lab 2 standards across all components |
| **Role Navigation** | Requesters see only permitted tabs; Staff sees Queue; Admin sees User Management | Playwright E2E role session tests | ✅ Passed | Navigation bar dynamically adapts to user role, unauthorized tabs hidden |
| **Badges & Indicators** | Distinct styling for 8 statuses, 5 IT priorities, and 3 user roles | E2E visual screenshot assertion | ✅ Passed | Badges use exact background/border/text tokens from Section 1.2 & 1.3 |
| **Editable vs Read-Only** | Read-only ticket fields clearly differentiated from editable operational toolbar | Visual comparison of form fields | ✅ Passed | Read-only fields styled with distinct muted background and border |
| **Validation Placement** | Inline field errors appear directly below offending inputs; top banner for API errors | Client form validation tests | ✅ Passed | Red text asterisks and error messages render directly below inputs |
| **Focus States** | Keyboard focus visible with green ring (`#0B7A46`) and accessible outline | Keyboard tab traversal audit | ✅ Passed | All interactive controls retain visible focus rings |
| **Clipping & Overlap** | Zero text truncation, clipping, or overlapping containers at any viewport | E2E multi-viewport test suites | ✅ Passed | Cards and tables wrap gracefully without text clipping |
| **Horizontal Overflow** | `scrollWidth <= clientWidth` on Desktop, Tablet, and Mobile screens | Automated `expectNoHorizontalOverflow` assertion in Playwright | ✅ Passed | Zero horizontal scroll across all 4 E2E spec files and viewports |

