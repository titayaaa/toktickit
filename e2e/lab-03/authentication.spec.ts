import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const { PrismaClient } = require('../../server/node_modules/@prisma/client');
const bcrypt = require('../../server/node_modules/bcryptjs');

const prisma = new PrismaClient();

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

test.describe('E2E-01: Authentication, Password Rotation & Role Redirection Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies & storage to ensure fresh session
    await page.context().clearCookies();

    // Reset all rotation.required test users before each test run
    const hash = await bcrypt.hash('Password123', 10);
    await prisma.user.updateMany({
      where: { email: { startsWith: 'rotation.required' } },
      data: { mustChangePassword: true, passwordHash: hash },
    });
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test('AUTH-01 / AUTH-02: Login screen validation, invalid credentials, and successful Requester login', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Capture responsive login screen
    await page.screenshot({
      path: shot('login', `login-${project}.png`),
      fullPage: true,
    });

    // Test invalid credentials
    await page.locator('#email').fill('nonexistent@example.com');
    await page.locator('#password').fill('WrongPassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify error banner
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText(/Invalid email or password/i);

    if (project === 'desktop') {
      await page.screenshot({
        path: shot('login', 'login-error.png'),
        fullPage: true,
      });
    }

    // Login with valid Requester credentials
    await page.locator('#email').fill('jennifer.anderson@example.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify successful login into main application
    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Jennifer Anderson')).toBeVisible();
    await expect(page.getByText('Requester')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Logout
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible();
  });

  test('AUTH-03: Inactive user login rejection (AC-02)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible();

    await page.locator('#email').fill('inactive.user@example.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText(/inactive|Invalid email or password/i);
  });

  test('AUTH-05 / AUTH-06: Mandatory password rotation with live complexity checklist (BR-02 & AC-03)', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible();

    // Login as user flagged with mustChangePassword = true
    await page.locator('#email').fill(`rotation.required.${project}@example.com`);
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify blocked from main app and presented with ChangePassword screen
    await expect(page.getByRole('heading', { name: 'Password Change Required' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Access to tickets and operational screens is locked')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Capture Change Password responsive screenshot
    await page.screenshot({
      path: shot('change-password', `change-password-${project}.png`),
      fullPage: true,
    });

    // Test real-time password complexity checklist
    await page.locator('#current-password').fill('Password123');
    await page.locator('#new-password').fill('abc'); // simple password

    // Check checklist items: should indicate incomplete
    await expect(page.getByText('At least 8 characters long')).toBeVisible();
    await expect(page.getByText('At least one uppercase letter (A-Z)')).toBeVisible();

    // Fill valid new password
    const validNewPassword = 'SecureNewPassword2026!';
    await page.locator('#new-password').fill(validNewPassword);
    await page.locator('#confirm-password').fill(validNewPassword);

    if (project === 'desktop') {
      await page.screenshot({
        path: shot('change-password', 'password-checklist-validated.png'),
        fullPage: true,
      });
    }

    // Submit password update
    await page.getByRole('button', { name: 'Update Password & Continue' }).click();

    // Verify user enters main application smoothly
    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Rotation Required User/i).first()).toBeVisible();
  });
});
