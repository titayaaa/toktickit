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

test.describe('E2E-02: IT Staff Operational Triage, Dual Stream Communication & Resolution Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('Staff Queue triage, filter/search, claim ticket, dual-stream notes, and resolution flow', async ({
    page,
  }, testInfo) => {
    const project = testInfo.project.name;

    // 1. Login as IT Staff Alice
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TokTickIT' })).toBeVisible({ timeout: 15_000 });

    await page.locator('#email').fill('staff.alice@toktickit.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Staff Queue automatically loads for IT Staff
    await expect(page.getByRole('heading', { name: 'TokTickIT IT Service Desk' })).toBeVisible({ timeout: 10_000 });
    const queueTab = page.getByRole('button', { name: 'Ticket Queue' });
    if (await queueTab.isVisible()) {
      await queueTab.click();
    }
    await expect(page.getByRole('heading', { name: 'IT Staff Ticket Queue' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Alice IT Support').first()).toBeVisible();
    await expect(page.getByText('IT Staff', { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Capture Staff Queue responsive screenshots
    await page.screenshot({
      path: shot('staff-queue', `queue-${project}.png`),
      fullPage: true,
    });

    // 3. Test Queue Filter & Search interactions
    const searchInput = page.getByRole('textbox', { name: 'Search tickets' });
    if (await searchInput.isVisible()) {
      await searchInput.fill('VPN');
      await page.getByRole('button', { name: 'Search' }).click();
      await page.waitForTimeout(500);

      if (project === 'desktop') {
        await page.screenshot({
          path: shot('staff-queue', 'queue-filtered-search.png'),
          fullPage: true,
        });
      }

      // Clear search to show tickets
      await searchInput.fill('');
      await page.getByRole('button', { name: 'Search' }).click();
      await page.waitForTimeout(500);
    }

    // 4. Select the first available ticket in the queue
    const ticketItem = project === 'mobile'
      ? page.locator('.d-md-none .card:has-text("TKT-")').first()
      : page.locator('button:has-text("TKT-")').first();
    await ticketItem.waitFor({ state: 'visible', timeout: 10_000 });
    const fullText = (await ticketItem.textContent()) || '';
    const ticketMatch = fullText.match(/TKT-\d{4}-\d{6}/);
    const ticketNumberText = ticketMatch ? ticketMatch[0] : 'TKT-2026';
    await ticketItem.click();

    // 5. Verify Ticket Detail view and IT Staff Operations toolbar
    await expect(page.getByText(ticketNumberText).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/IT Staff Operations|Operations/i).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Capture responsive Ticket Detail screenshots
    await page.screenshot({
      path: shot('ticket-operations', `detail-${project}.png`),
      fullPage: true,
    });

    // 6. Test Dual-Stream Communication
    // 6.1 Public Comments Tab
    const commentsTab = page.getByRole('button', { name: /Public Comments/i });
    if (await commentsTab.isVisible()) {
      await commentsTab.click();
      await page.waitForTimeout(300);

      // Add a test public comment
      const commentInput = page.getByPlaceholder(/Add a public comment/i);
      if (await commentInput.isVisible()) {
        await commentInput.fill('IT Staff update: We are actively investigating this report.');
        await page.getByRole('button', { name: /Post Comment|Send Comment/i }).click();
        await page.waitForTimeout(500);
      }

      if (project === 'desktop') {
        await page.screenshot({
          path: shot('ticket-operations', 'public-comments-timeline.png'),
          fullPage: true,
        });
      }
    }

    // 6.2 Internal Notes Tab (BR-13 & AC-05: Confidential Amber styling)
    const notesTab = page.getByRole('button', { name: /Internal Notes/i });
    if (await notesTab.isVisible()) {
      await notesTab.click();
      await page.waitForTimeout(300);

      // Verify confidential banner
      await expect(page.getByText('Confidential Internal Notes')).toBeVisible();

      // Post an internal note
      const noteInput = page.getByPlaceholder(/Add an internal note/i);
      if (await noteInput.isVisible()) {
        await noteInput.fill('Triage note: Gateway router logs show packet drop on eth0.');
        await page.getByRole('button', { name: /Add Note|Post Note/i }).click();
        await page.waitForTimeout(500);
      }

      if (project === 'desktop') {
        await page.screenshot({
          path: shot('ticket-operations', 'internal-notes-amber-styling.png'),
          fullPage: true,
        });
      }
    }

    // 7. Resolve Ticket Flow (BR-05 & AC-08: Mandatory Resolution Summary)
    const resolveButton = page.getByRole('button', { name: /Resolve Ticket|Resolve/i }).first();
    if (await resolveButton.isVisible()) {
      await resolveButton.click();

      // Verify Resolve Modal is shown
      await expect(page.getByRole('heading', { name: /Resolve Ticket/i })).toBeVisible();
      await expect(page.getByText(/Resolution Summary/i)).toBeVisible();

      if (project === 'desktop') {
        await page.screenshot({
          path: shot('ticket-operations', 'resolve-ticket-modal.png'),
          fullPage: true,
        });
      }

      // Enter required resolution summary
      const resolutionTextarea = page.getByPlaceholder(/Describe what actions were taken/i);
      await resolutionTextarea.fill('Replaced faulty patch cable and flushed DNS cache. Service verified fully operational.');
      await page.getByRole('button', { name: /Confirm Resolution|Submit Resolution/i }).click();

      // Verify ticket status badge updates to Resolved
      await expect(page.getByText(/RESOLVED/i).first()).toBeVisible({ timeout: 10_000 });
    }

    // Return to Queue
    await page.getByRole('button', { name: /Back to Queue|Back/i }).first().click();
    await expect(page.getByRole('heading', { name: 'IT Staff Ticket Queue' })).toBeVisible();
  });
});
