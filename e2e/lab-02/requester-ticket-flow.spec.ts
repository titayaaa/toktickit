import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

function screenshotDir() {
  return path.join(__dirname, '..', '..', 'artifacts', 'lab-02', 'screenshots');
}

function shot(project: string, sub: string, name: string): string {
  const dir = path.join(screenshotDir(), sub);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, `${name}-${project}.png`);
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, 'Page should not have horizontal scroll').toBeLessThanOrEqual(1);
}

test.describe('E2E-01: Requester Ticket Flow (full journey)', () => {
  test('select requester -> create ticket -> view in My Tickets -> detail + attachment upload & soft-remove', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;
    const summary = `E2E WiFi Issue ${Date.now()}`;
    const description = 'Playwright end-to-end flow verifying the full requester ticket journey across viewports.';
    const fixture = path.join(__dirname, 'fixtures', 'wifi_error.png');

    // --- Step 1: Requester selection screen ---
    await page.goto('/');

    // Wait for either the requester selector (after loading finishes) or the main app header
    const selectOrHeader = page.locator('#requesterSelect, h1').first();
    await selectOrHeader.waitFor({ state: 'visible', timeout: 15_000 });

    const requesterSelect = page.locator('#requesterSelect');
    if (await requesterSelect.isVisible()) {
      // Select first active requester
      await requesterSelect.selectOption({ index: 0 });
      await page.getByRole('button', { name: /Continue/i }).click();
    }

    // Verify main app header is visible
    await expect(page.locator('h1')).toContainText('TokTickIT IT Service Desk');
    await expect(page.locator('text=Current Requester:')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // --- Step 2: Create Ticket screen ---
    // Ensure on Create Ticket tab
    await page.getByRole('button', { name: /Create Ticket/i }).first().click();

    await page.locator('#summary').fill(summary);
    await page.locator('#description').fill(description);

    // Select category and system (first available options)
    const categorySelect = page.locator('#categoryId');
    await expect(categorySelect).toBeVisible();
    const catOptions = await categorySelect.locator('option').all();
    if (catOptions.length > 1) {
      await categorySelect.selectOption({ index: 1 });
    }

    const systemSelect = page.locator('#relatedSystemId');
    await expect(systemSelect).toBeVisible();
    const sysOptions = await systemSelect.locator('option').all();
    if (sysOptions.length > 1) {
      await systemSelect.selectOption({ index: 1 });
    }

    // Set Priority to HIGH
    await page.locator('#requestedPriority').selectOption('HIGH');

    // Screenshot 1: Create Ticket form filled
    await page.screenshot({ path: shot(project, 'create-ticket', 'create-ticket'), fullPage: true });

    // Submit ticket
    await page.getByRole('button', { name: /Submit Ticket/i }).click();

    // Verify ticket creation success banner
    const successBanner = page.locator('.alert-success');
    await expect(successBanner).toBeVisible({ timeout: 10_000 });
    await expect(successBanner).toContainText('Ticket successfully created!');

    // Extract ticket number
    const ticketNumberEl = successBanner.locator('strong');
    const ticketNumber = (await ticketNumberEl.textContent())?.trim() || '';
    expect(ticketNumber).toMatch(/^TKT-\d{4}-\d{6}$/);

    // --- Step 3: Navigate to My Tickets ---
    await page.getByRole('button', { name: /My Tickets/i }).first().click();
    await expectNoHorizontalOverflow(page);

    // Search for the newly created ticket
    const searchInput = page.getByRole('textbox', { name: /Search tickets/i });
    await searchInput.fill(ticketNumber);
    await page.getByRole('button', { name: 'Submit search' }).click();

    // Wait for row (desktop) or card (mobile) to appear
    const ticketRowOrCard = page.getByRole('button', { name: `View details for ticket ${ticketNumber}` });
    await expect(ticketRowOrCard).toBeVisible({ timeout: 10_000 });

    // Screenshot 2: My Tickets list view
    await page.screenshot({ path: shot(project, 'my-tickets', 'my-tickets'), fullPage: true });

    // --- Step 4: Click to open Ticket Detail ---
    await ticketRowOrCard.click();

    // Wait for Ticket Detail view to load
    await expect(page.locator('[data-testid="ticket-detail-view"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('h2')).toContainText(ticketNumber);
    await expect(page.locator('text=Priority:')).toContainText('HIGH');
    await expect(page.locator(`text=${summary}`)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // --- Step 5: Upload Attachment in Ticket Detail ---
    const attachmentInput = page.locator('#attachment-file-input');
    await expect(attachmentInput).toBeVisible();
    await attachmentInput.setInputFiles(fixture);

    // Wait for attachment to appear in list
    const uploadedItem = page.locator('text=wifi_error.png');
    await expect(uploadedItem).toBeVisible({ timeout: 10_000 });

    // Verify Download button is present
    await expect(page.locator('[data-testid^="btn-download-"]').first()).toBeVisible();

    // Screenshot 3: Ticket Detail with active attachment
    await page.screenshot({ path: shot(project, 'ticket-detail', 'ticket-detail'), fullPage: true });

    // --- Step 6: Soft-Remove Attachment with reason ---
    const removeBtn = page.locator('[data-testid^="btn-remove-"]').first();
    await removeBtn.click();

    // Fill removal reason
    const reasonDialog = page.locator('[data-testid="remove-reason-dialog"]');
    await expect(reasonDialog).toBeVisible();
    await page.locator('[data-testid="removal-reason-input"]').fill('Uploaded test evidence by mistake');

    // Confirm remove
    await page.locator('[data-testid="btn-confirm-remove"]').click();

    // Verify marked as [Removed]
    await expect(page.locator('[data-testid^="badge-removed-"]').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('text=Reason: Uploaded test evidence by mistake')).toBeVisible();

    // Screenshot 4: Ticket Detail after soft-removal
    await page.screenshot({ path: shot(project, 'ticket-detail', 'ticket-detail-removed'), fullPage: true });

    // --- Step 7: Back Navigation ---
    await page.getByRole('button', { name: /Back to My Tickets/i }).click();
    await expect(page.locator('[data-testid="ticket-detail-view"]')).toBeHidden();
    await expect(page.locator('h1')).toContainText('TokTickIT IT Service Desk');
    await expectNoHorizontalOverflow(page);
  });
});
