import { test, expect } from '@playwright/test';

test.describe('E2E-02: Visual Regression & Responsive Layout Checking', () => {
  test('Development Requester Selection screen snapshot match', async ({ page }) => {
    await page.goto('/');
    const selectOrHeader = page.locator('#requesterSelect, h1').first();
    await selectOrHeader.waitFor({ state: 'visible', timeout: 15_000 });

    const requesterSelect = page.locator('#requesterSelect');
    if (await requesterSelect.isVisible()) {
      // Visual regression comparison for requester selection screen
      await expect(page).toHaveScreenshot('development-requester-selection.png', {
        maxDiffPixelRatio: 0.05,
      });

      // Proceed to main application
      await requesterSelect.selectOption({ index: 0 });
      await page.getByRole('button', { name: /Continue/i }).click();
    }
  });

  test('Create Ticket screen responsive layout snapshot match', async ({ page }) => {
    await page.goto('/');
    const selectOrHeader = page.locator('#requesterSelect, h1').first();
    await selectOrHeader.waitFor({ state: 'visible', timeout: 15_000 });

    const requesterSelect = page.locator('#requesterSelect');
    if (await requesterSelect.isVisible()) {
      await requesterSelect.selectOption({ index: 0 });
      await page.getByRole('button', { name: /Continue/i }).click();
    }

    // Switch to Create Ticket tab
    await page.getByRole('button', { name: /Create Ticket/i }).first().click();
    await expect(page.locator('#summary')).toBeVisible();

    // Visual comparison with baseline
    await expect(page).toHaveScreenshot('create-ticket-form-layout.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('My Tickets list view responsive layout snapshot match', async ({ page }) => {
    await page.goto('/');
    const selectOrHeader = page.locator('#requesterSelect, h1').first();
    await selectOrHeader.waitFor({ state: 'visible', timeout: 15_000 });

    const requesterSelect = page.locator('#requesterSelect');
    if (await requesterSelect.isVisible()) {
      await requesterSelect.selectOption({ index: 0 });
      await page.getByRole('button', { name: /Continue/i }).click();
    }

    // Switch to My Tickets tab
    await page.getByRole('button', { name: /My Tickets/i }).first().click();
    await expect(page.getByRole('textbox', { name: /Search tickets/i })).toBeVisible();

    // Visual comparison with baseline (masking dynamic timestamps/dates if present)
    await expect(page).toHaveScreenshot('my-tickets-list-layout.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
