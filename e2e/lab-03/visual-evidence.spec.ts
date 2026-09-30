import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function screenshotDir() {
  return path.join(__dirname, '..', '..', 'artifacts', 'lab-03', 'screenshots');
}

function shot(sub: string, filename: string) {
  const dir = path.join(screenshotDir(), sub);
  ensureDirectoryExistence(path.join(dir, filename));
  return path.join(dir, filename);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, 'Page should not have horizontal scroll').toBeLessThanOrEqual(1);
}

test.describe('Sprint 3 Responsive Visual Evidence & UI Style Audit (Issue 26)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.context().clearCookies();
    await page.reload();
  });

  test('Audit and capture visual evidence across Authentication, Queue, Detail, and User Management', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;

    // 1. Authentication View
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible({ timeout: 15_000 });
    await expectNoHorizontalOverflow(page);
    await page.screenshot({
      path: shot('login', `visual-audit-login-${project}.png`),
      fullPage: true,
    });

    // 2. Staff Login & Queue View
    await page.locator('#email').fill('staff.alice@toktickit.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    const queueTab = page.getByRole('button', { name: 'Ticket Queue' });
    if (await queueTab.isVisible()) {
      await queueTab.click();
    }
    await expect(page.getByRole('heading', { name: 'IT Staff Ticket Queue' })).toBeVisible({ timeout: 10_000 });
    await expectNoHorizontalOverflow(page);
    await page.screenshot({
      path: shot('staff-queue', `visual-audit-queue-${project}.png`),
      fullPage: true,
    });

    // 3. Ticket Detail View
    let viewDetailBtn = page.getByRole('button', { name: 'View Details' }).first();
    if (!(await viewDetailBtn.isVisible())) {
      viewDetailBtn = page.locator('.card button:has-text("View Details")').first();
    }
    if (await viewDetailBtn.isVisible()) {
      await viewDetailBtn.click();
      await expect(page.getByRole('heading', { name: /Ticket Details/i })).toBeVisible({ timeout: 10_000 });
      await expectNoHorizontalOverflow(page);
      await page.screenshot({
        path: shot('ticket-operations', `visual-audit-detail-${project}.png`),
        fullPage: true,
      });
    }

    // 4. Logout and Login as Administrator
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible({ timeout: 10_000 });

    await page.locator('#email').fill('admin.bew@toktickit.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    const adminTab = page.getByRole('button', { name: 'User Management' });
    if (await adminTab.isVisible()) {
      await adminTab.click();
    }
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible({ timeout: 10_000 });
    await expectNoHorizontalOverflow(page);
    await page.screenshot({
      path: shot('user-management', `visual-audit-roster-${project}.png`),
      fullPage: true,
    });
  });
});
