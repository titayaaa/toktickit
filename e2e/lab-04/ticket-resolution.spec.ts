import { test, expect, Page } from "@playwright/test";
import * as path from "path";

function screenshotDir() {
  return path.join(__dirname, "..", "..", "artifacts", "lab-04", "screenshots");
}

function shot(project: string, sub: string, name: string): string {
  return path.join(screenshotDir(), sub, `${name}-${project}.png`);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, "page should not have horizontal scroll").toBeLessThanOrEqual(1);
}

async function login(page: Page, email: string, password: string) {
  await page.goto("/");
  const emailInput = page.locator('[data-testid="login-email"], #email').first();
  const passwordInput = page.locator('[data-testid="login-password"], #password').first();
  const submitBtn = page.locator('[data-testid="login-submit"], button[type="submit"]').first();
  await emailInput.fill(email);
  await passwordInput.fill(password);
  await submitBtn.click();
}

async function navigateHeader(page: Page, project: string, viewId: string) {
  const desktopTab = page.locator(`[data-testid="header-nav-${viewId}"], [data-testid="nav-${viewId}"]`).first();
  if (await desktopTab.isVisible()) {
    await desktopTab.click();
    return;
  }
  const toggle = page.getByTestId("header-nav-toggle");
  if (await toggle.isVisible()) {
    await toggle.click();
    await page.getByTestId(`header-mobile-nav-${viewId}`).click();
    return;
  }
  await desktopTab.click();
}

test.describe("E2E-02: Ticket resolution gate & lifecycle verification (AC-07, AC-08, AC-13)", () => {
  test("Requester indicates problem resolved (advisory only); IT Staff enforces transition matrix and Resolution Gate before resolving", async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;
    const isMobile = project === "mobile";

    // --- 1. Login as Requester and create a fresh ticket ---
    await login(page, "jennifer@toktickit.com", "Password123!");
    await expect(page.getByTestId("my-tickets-card")).toBeVisible();
    await navigateHeader(page, project, "create-ticket");
    await expect(page.locator('[data-testid="submit-ticket-btn"], button[type="submit"]').first()).toBeVisible();

    const summary = `E2E Resolution Gate flow ${Date.now()}`;
    await page.locator("#summary").fill(summary);
    await page.locator("#description").fill("VPN client disconnects intermittently during video calls.");
    await page.locator("#requestedPriority").selectOption("MEDIUM");
    await expect(page.locator("#categoryId option")).not.toHaveCount(1);
    await page.locator("#categoryId").selectOption({ index: 1 });
    await expect(page.locator("#relatedSystemId option")).not.toHaveCount(1);
    await page.locator("#relatedSystemId").selectOption({ index: 1 });
    await page.locator('[data-testid="submit-ticket-btn"], button[type="submit"]').first().click();
    await expect(page.getByTestId("success-alert")).toBeVisible({ timeout: 15_000 });
    const successText = (await page.getByTestId("success-alert").textContent())!;
    const ticketNumber = successText.match(/TKT-\d{4}-\d{6}/)![0];

    // --- 2. Open ticket detail as Requester and indicate problem is resolved (AC-08, BR-09) ---
    await navigateHeader(page, project, "my-tickets");
    await page.getByTestId("my-tickets-search").fill(ticketNumber);
    await page.getByTestId("my-tickets-search-btn").click();
    const requesterEntry = page
      .locator(isMobile ? '[data-testid^="my-tickets-card-"]' : '[data-testid^="my-tickets-row-"]')
      .filter({ hasText: ticketNumber })
      .first();
    await expect(requesterEntry).toBeVisible({ timeout: 15_000 });
    await requesterEntry.click();

    await expect(page.locator('[data-testid="back-to-my-tickets"], [data-testid="ticket-detail-back-button"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("New");
    await expect(page.getByTestId("requester-resolution-gate")).toBeVisible();

    await page.getByTestId("requester-indicate-resolved-btn").click();
    const confirmBox = page.locator('[data-testid="requester-indicate-resolved-confirm"]');
    if (await confirmBox.isVisible()) {
      await confirmBox.click();
    }

    await expect(page.getByTestId("requester-resolved-advisory")).toBeVisible();
    await expect(page.getByTestId("requester-resolved-advisory-badge")).toHaveText(
      "Requester indicated problem resolved - Pending Staff Review"
    );
    // Ticket status must remain "New" (advisory only, no direct status transition by Requester)
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("New");
    await page.screenshot({ path: shot(project, "workflow", "requester-indicated-resolved"), fullPage: true });
    await expectNoHorizontalOverflow(page);

    // --- 3. Logout and login as IT Staff ---
    await page.getByTestId("header-user-menu").click();
    await page.getByTestId("header-logout").click();
    await expect(page.getByTestId("login-card")).toBeVisible();

    await login(page, "alex.it@toktickit.com", "Password123!");
    await expect(page.locator('[data-testid="staff-queue-card"], [data-testid="staff-ticket-queue"]').first()).toBeVisible();

    await page.getByTestId("queue-search").fill(ticketNumber);
    await page.getByTestId("queue-search-btn").click();
    const queueEntry = page
      .locator(isMobile ? '[data-testid^="queue-card-"]' : '[data-testid^="queue-row-"]')
      .filter({ hasText: ticketNumber })
      .first();
    await expect(queueEntry).toBeVisible({ timeout: 15_000 });
    await queueEntry.click();

    await expect(page.getByTestId("staff-detail-card")).toBeVisible();
    await expect(page.getByTestId("detail-resolved-intent")).toBeVisible();
    await expect(page.getByTestId("staff-resolved-advisory-badge")).toHaveText(
      "Requester indicated problem resolved - Pending Staff Review"
    );

    // --- 4. Claim ticket (New -> Open) & transition Open -> In Progress (AC-07, BR-08) ---
    await page.getByTestId("detail-claim").click();
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("Open");
    // Open cannot jump directly to Resolved
    await expect(page.getByTestId("workflow-resolve-btn")).toHaveCount(0);
    await expect(page.getByTestId("workflow-transition-in-progress")).toBeVisible();

    await page.getByTestId("workflow-transition-in-progress").click();
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("In Progress");

    // --- 5. Add a PENDING Action Taken to trigger the Resolution Gate (AC-13, BR-15) ---
    await page.locator('[data-testid="action-add"], [data-testid="add-action-taken-btn"]').first().click();
    const assigneeSelect = page.locator('[data-testid="action-assignee"], [data-testid="action-assignee-select"]').first();
    await expect(assigneeSelect.locator("option")).not.toHaveCount(1);
    await assigneeSelect.selectOption({ index: 1 });
    await page.locator('[data-testid="action-description"], [data-testid="action-description-input"]').first().fill("Verify split-tunnel routing table and MTU settings.");
    await page.getByTestId("action-save").click();
    await expect(page.getByTestId("actions-taken-count")).toHaveText("1");

    // Resolution Gate warning banner and resolve button are now visible
    await expect(page.locator('[data-testid="resolution-gate-warning"], [data-testid="actions-resolution-warning"]').first()).toBeVisible();
    await expect(page.getByTestId("workflow-resolve-btn")).toContainText("Resolve");

    // Clicking Resolve opens the Resolution Gate Confirmation Modal
    await page.getByTestId("workflow-resolve-btn").click();
    await expect(page.locator('[data-testid="resolution-gate-modal"], [data-testid="modal-resolution-gate-warning"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="resolution-gate-modal-message"], [data-testid="modal-resolution-gate-warning"]').first()).toContainText(
      /unresolved action/i
    );
    await page.screenshot({ path: shot(project, "workflow", "resolution-gate-modal"), fullPage: true });
    await expectNoHorizontalOverflow(page);

    // Attempting to resolve anyway triggers backend 409 Conflict (RESOLUTION_GATE_BLOCKED)
    const resSummaryInput = page.locator("#resolution-summary-input");
    if (await resSummaryInput.isVisible()) {
      await resSummaryInput.fill("Configured MTU 1380 and verified split tunnel stability.");
    }
    await page.getByTestId("resolution-gate-confirm").click();
    await expect(page.locator('[data-testid="detail-action-error"], [data-testid="resolve-error-alert"]').first()).toContainText(/Cannot resolve ticket|Resolution Gate Blocked/i);
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("In Progress");

    // Close resolve modal to proceed with completing the action
    const closeBtn = page.locator('.modal .btn-close, .modal button:has-text("Cancel")').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }

    // --- 6. Complete the Action Taken -> Resolve succeeds ---
    const actionCard = page.locator('[data-testid^="action-card-"]').first();
    await actionCard.locator('[data-testid^="action-complete-"]').click();
    await page.locator('[data-testid="action-result"], [data-testid="action-result-input"]').first().fill("Adjusted VPN tunnel MTU to 1380 and confirmed stable session.");
    await page.getByTestId("action-save").click();

    await expect(page.locator('[data-testid="resolution-gate-warning"], [data-testid="actions-resolution-warning"]')).toHaveCount(0);
    await expect(page.getByTestId("workflow-resolve-btn")).toContainText("Resolve");

    await page.getByTestId("workflow-resolve-btn").click();
    if (await resSummaryInput.isVisible()) {
      await resSummaryInput.fill("Adjusted VPN tunnel MTU to 1380 and confirmed stable split-tunnel session.");
      await page.getByTestId("resolution-gate-confirm").click();
    }
    await expect(page.locator('[data-testid="detail-status"], [data-testid="ticket-status-badge"]').first()).toContainText("Resolved");
    await expect(page.locator('[data-testid="detail-notice"], .alert-success').first()).toContainText(/successfully/i);
    await page.screenshot({ path: shot(project, "workflow", "ticket-resolved"), fullPage: true });
    await expectNoHorizontalOverflow(page);
  });
});

