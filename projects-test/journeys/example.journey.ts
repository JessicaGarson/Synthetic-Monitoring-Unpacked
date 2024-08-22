import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Simplified Test for Demo Store', ({ page, params }) => {
  monitor.use({
    id: 'demo-store-check',
    schedule: 10, // Frequency in minutes to run this test
  });

  step('Launch application', async () => {
    await page.goto(params.url);
  });

  step('Check for loading state', async () => {
    const loadingText = page.locator('text=Loading...');
    if (await loadingText.isVisible({ timeout: 5000 })) {
      await loadingText.waitFor({ state: 'hidden', timeout: 60000 });
    }
  });

  step('Validate page content', async () => {
    // Check if main header is present
    const header = await page.locator('h1');
    await expect(header).toHaveText('Demo Store');

    // Ensure the first product card and Buy button are loaded
    const firstProductCard = page.locator('[data-test="product-card"]').first();
    await expect(firstProductCard).toBeVisible();

    const buyButton = firstProductCard.locator('[data-test="buy-button"]');
    await expect(buyButton).toBeVisible();

    // Take a screenshot for visual confirmation
    await page.screenshot({ path: 'page-content.png' });
  });

  step('Monitor page performance', async () => {
    // Measure and log performance metrics
    const performance = await page.evaluate(() => {
      return JSON.stringify(window.performance);
    });
    console.log(performance);
  });
});
