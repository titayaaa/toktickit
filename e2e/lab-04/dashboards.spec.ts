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

test.describe("E2E-03: Role dashboards navigation & drill-down flow (AC-04, AC-05, FR-10)", () => {
  test("IT Staff and Requester view their role-specific dashboards and drill down into filtered ticket lists", async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;
    const isMobile = project === "mobile";

    // --- 1. Login as IT Staff and open the IT Staff Dashboard ---
    await login(page, "alex.it@toktickit.com", "Password123!");
    await expect(page.locator('[data-testid="staff-queue-card"], [data-testid="staff-ticket-queue"]').first()).toBeVisible();

    await navigateHeader(page, project, "dashboard");
    await expect(page.getByTestId("staff-dashboard")).toBeVisible();
    await expect(page.getByTestId("staff-dashboard-greeting")).toContainText("Welcome back,");
    await expect(page.getByTestId("staff-dashboard-greeting")).toContainText("Alex Thompson");

    // Verify all 5 operational metric cards are rendered with numeric values
    for (const key of ["new", "open", "in-progress", "waiting-for-requester", "my-assigned"]) {
      await expect(page.getByTestId(`staff-metric-card-${key}`)).toBeVisible();
      await expect(page.getByTestId(`staff-metric-value-${key}`)).toHaveText(/^\d+$/);
    }

    // Verify Recent Queue Tickets & Quick Actions panels
    await expect(page.getByTestId("staff-recent-tickets-panel")).toBeVisible();
    await expect(page.getByTestId("staff-quick-actions-panel")).toBeVisible();
    if (isMobile) {
      await expect(page.getByTestId("staff-recent-tickets-cards")).toBeVisible();
    } else {
      await expect(page.getByTestId("staff-recent-tickets-table")).toBeVisible();
    }
    await page.screenshot({ path: shot(project, "dashboards", "staff-dashboard"), fullPage: true });
    await expectNoHorizontalOverflow(page);

    // --- 2. Drill down from Staff Dashboard "In Progress" card -> Ticket Queue filtered by "In Progress" ---
    await page.getByTestId("staff-metric-card-in-progress").click();
    await expect(page.locator('[data-testid="staff-queue-card"], [data-testid="staff-ticket-queue"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="queue-filter-status"], #queue-status-filter').first()).toHaveValue(/In Progress|IN_PROGRESS/i);
    await expectNoHorizontalOverflow(page);

    // --- 3. Return to Staff Dashboard and test "My Queue" Quick Action drill-down ---
    await navigateHeader(page, project, "dashboard");
    await expect(page.getByTestId("staff-dashboard")).toBeVisible();
    await page.getByTestId("staff-quick-action-my-queue").click();
    await expect(page.locator('[data-testid="staff-queue-card"], [data-testid="staff-ticket-queue"]').first()).toBeVisible();
    await expect(page.getByTestId("queue-filter-owner")).not.toHaveValue("");

    // --- 4. Logout and login as Requester, then open Requester Dashboard ---
    await page.getByTestId("header-user-menu").click();
    await page.getByTestId("header-logout").click();
    await expect(page.getByTestId("login-card")).toBeVisible();

    await login(page, "jennifer@toktickit.com", "Password123!");
    await expect(page.getByTestId("my-tickets-card")).toBeVisible();

    await navigateHeader(page, project, "dashboard");
    await expect(page.locator('[data-testid="requester-dashboard"], [data-testid="requester-dashboard-container"]').first()).toBeVisible();
    await expect(page.getByTestId("requester-dashboard-greeting")).toContainText(/Welcome/i);
    await expect(page.getByTestId("requester-dashboard-greeting")).toContainText("Jennifer Anderson");

    // Verify all 4 requester metric cards are rendered with numeric values
    for (const key of ["open", "waiting", "recent", "resolved"]) {
      const card = page.locator(`[data-testid="requester-metric-card-${key}"], [data-testid="requester-metric-card-my-${key}"]`).first();
      await expect(card).toBeVisible();
      const val = page.locator(`[data-testid="metric-value-${key}"], [data-testid="requester-metric-value-${key}"]`).first();
      await expect(val).toHaveText(/^\d+$/);
    }

    // Verify My Recent Tickets & Quick Actions panels
    await expect(page.locator('[data-testid="requester-recent-tickets-panel"], [data-testid="requester-recent-tickets-section"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="requester-quick-actions-panel"], [data-testid="requester-quick-actions"]').first()).toBeVisible();
    if (isMobile) {
      await expect(page.locator('[data-testid="requester-recent-tickets-cards"], [data-testid="requester-recent-mobile-list"]').first()).toBeVisible();
    } else {
      await expect(page.locator('[data-testid="requester-recent-tickets-table"], [data-testid="requester-recent-table"]').first()).toBeVisible();
    }
    await page.screenshot({ path: shot(project, "dashboards", "requester-dashboard"), fullPage: true });
    await expectNoHorizontalOverflow(page);

    // --- 5. Drill down from Requester Dashboard "Resolved" card -> My Tickets filtered by "Resolved" ---
    await page.locator('[data-testid="requester-metric-card-resolved"], [data-testid="requester-metric-card-closed"]').first().click();
    await expect(page.getByTestId("my-tickets-card")).toBeVisible();
    await expect(page.locator('[data-testid="my-tickets-filter-status"]').first()).toHaveValue(/Resolved|RESOLVED/i);
    await expectNoHorizontalOverflow(page);

    // --- 6. Return to Requester Dashboard and verify Quick Actions (+ Create Ticket & View My Tickets) ---
    await navigateHeader(page, project, "dashboard");
    await expect(page.getByTestId("requester-dashboard")).toBeVisible();
    await page.getByTestId("requester-quick-action-create-ticket").click();
    await expect(page.locator('[data-testid="submit-ticket-btn"], button[type="submit"]').first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await navigateHeader(page, project, "dashboard");
    await expect(page.getByTestId("requester-dashboard")).toBeVisible();
    await page.getByTestId("requester-quick-action-view-tickets").click();
    await expect(page.getByTestId("my-tickets-card")).toBeVisible();
    await expect(page.locator('[data-testid="my-tickets-filter-status"]').first()).toHaveValue("");
    await expectNoHorizontalOverflow(page);
  });
});

