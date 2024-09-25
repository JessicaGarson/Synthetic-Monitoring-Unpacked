import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Simplified Test for Demo Store', ({ page, params }) => {
  monitor.use({
    id: 'demo-store-check',
    schedule: 10,
  });

  step('Launch application', async () => {
    await page.goto(params.url);
  });

  step('Check for loading state', async () => {
    const loadingText = page.getByText('Loading...');
    if (await loadingText.isVisible({ timeout: 5000 })) {
      await loadingText.waitFor({ state: 'hidden', timeout: 60000 });
    }
  });

  step('Validate page content', async () => {
    const header = page.getByRole('heading', { level: 1 });
    await expect(header).toHaveText('Demo Store');

    const firstProductCard = page.getByTestId('product-card').first();
    await expect(firstProductCard).toBeVisible();

    const buyButton = firstProductCard.getByTestId('buy-button');
    await expect(buyButton).toBeVisible();

    await page.screenshot({ path: 'page-content.png' });
  });

  step('Interact with the Buy button', async () => {
    page.once('dialog', async dialog => {
      const message = dialog.message();
      console.log('Alert message:', message);
      expect(message).toBe('Added to cart!');
      await dialog.accept();
    });

    const firstProductCard = page.getByTestId('product-card').first();
    const buyButton = firstProductCard.getByTestId('buy-button');
    await buyButton.click();

    await page.screenshot({ path: 'after-click.png' });
  });

  step('Monitor page performance', async () => {
    const performance = await page.evaluate(() => {
      return JSON.stringify(window.performance);
    });
    console.log(performance);
  });
});