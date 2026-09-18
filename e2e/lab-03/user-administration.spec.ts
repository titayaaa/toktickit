import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

function screenshotDir() {
  return path.join(__dirname, '..', '..', 'artifacts', 'lab-03', 'screenshots');
}

function shot(sub: string, filename: string): string {
  const dir = path.join(screenshotDir(), sub);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, filename);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, 'Page should not have horizontal scroll').toBeLessThanOrEqual(1);
}

test.describe('E2E-03: Administrator User Roster, Account Lifecycle & Safety Guards', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('User management roster, search, create user with complexity, self-deactivation guard, and password reset', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;

    // 1. Login as Administrator
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible({ timeout: 15_000 });

    await page.locator('#email').fill('admin.bew@toktickit.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. User Management tab loads automatically for Admin
    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    const userMgmtTab = page.getByRole('button', { name: 'User Management' });
    if (await userMgmtTab.isVisible()) {
      await userMgmtTab.click();
    }
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Bew Administrator').first()).toBeVisible();
    await expect(page.getByText('Administrator', { exact: true }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Capture User Management responsive screenshots
    await page.screenshot({
      path: shot('user-management', `roster-${project}.png`),
      fullPage: true,
    });

    // 3. Search Users in Roster
    const searchInput = page.getByPlaceholder(/Search by full name or email/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('Alice');
      await page.waitForTimeout(400); // Allow debounce
      await expect(page.locator(':visible').filter({ hasText: 'Alice IT Support' }).first()).toBeVisible();

      // Clear search
      await searchInput.fill('');
      await page.waitForTimeout(400);
    }

    // 4. Create User Modal Flow
    const createBtn = page.getByTestId('create-user-button');
    await expect(createBtn).toBeVisible();
    await createBtn.click();

    await expect(page.getByRole('heading', { name: 'Create User Account' })).toBeVisible();

    const timestamp = Date.now();
    await page.locator('#create-fullname-input').fill(`New Support Tech ${timestamp}`);
    await page.locator('#create-email-input').fill(`tech.${timestamp}@toktickit.com`);
    await page.locator('#create-role-select').selectOption('IT_STAFF');

    // Test real-time password complexity checklist
    await page.locator('#create-password-input').fill('TempPass123!');
    await expect(page.getByText(/At least 8 characters/i)).toBeVisible();

    if (project === 'desktop') {
      await page.screenshot({
        path: shot('user-management', 'create-user-modal.png'),
        fullPage: true,
      });
    }

    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/created successfully|New Support Tech/i).first()).toBeVisible({ timeout: 10_000 });

    // 5. Safety Guards Verification (BR-17, BR-18, BR-19)
    // Find row or card with (You) tag for Bew Administrator
    const youRow = project === 'mobile'
      ? page.locator('[data-testid="admin-users-mobile-cards"] > div').filter({ hasText: '(You)' }).first()
      : page.locator('tbody tr').filter({ hasText: '(You)' }).first();

    await youRow.waitFor({ state: 'visible', timeout: 10_000 });
    await youRow.getByRole('button', { name: /Edit/i }).click();

    // Verify Edit modal is open
    await expect(page.getByRole('heading', { name: /Edit User/i })).toBeVisible();

    // Verify Safety Guard: Role select and Deactivation are disabled for self
    const editRoleSelect = page.locator('#edit-role-select');
    await expect(editRoleSelect).toBeDisabled();

    const activeCheckbox = page.locator('#edit-active-checkbox');
    await expect(activeCheckbox).toBeDisabled();

    if (project === 'desktop') {
      await page.screenshot({
        path: shot('user-management', 'self-protection-guard.png'),
        fullPage: true,
      });
    }

    await page.getByRole('button', { name: 'Cancel' }).click();

    // 6. Reset Password Modal Flow
    // Find the newly created user row/card to reset password
    const targetRow = project === 'mobile'
      ? page.locator('[data-testid="admin-users-mobile-cards"] > div').filter({ hasText: `New Support Tech ${timestamp}` }).first()
      : page.locator('tbody tr').filter({ hasText: `New Support Tech ${timestamp}` }).first();

    await targetRow.waitFor({ state: 'visible', timeout: 10_000 });
    await targetRow.getByRole('button', { name: /Reset/i }).click();

    await expect(page.getByRole('heading', { name: /Reset Password/i })).toBeVisible();
    await page.locator('#reset-password-input').fill('ResetTemp2026!');

    if (project === 'desktop') {
      await page.screenshot({
        path: shot('user-management', 'reset-password-modal.png'),
        fullPage: true,
      });
    }

    await page.getByTestId('reset-user-submit-button').click();
    await expect(page.getByText(/has been reset/i)).toBeVisible({ timeout: 10_000 });
  });
});
