const { journey, step, expect } = require('@elastic/synthetics');

journey('Recorded journey', async ({ page, context }) => {
  step('Go to https://demo-store-ivory.vercel.app/products', async () => {
    await page.goto('https://demo-store-ivory.vercel.app/products');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Coffee Mug\$15A coffee mug!Buy$/ }).getByTestId('buy-button').click();
    await page.getByRole('img', { name: 'Coffee Mug' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Set of Pens\$10Pens in assorted colors\.Buy$/ }).getByTestId('buy-button').click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Plush Elk\$16Elastic Elk!Buy$/ }).getByTestId('buy-button').click();
    await page.getByText('Coffee Mug$15A coffee mug!BuySet of Pens$10Pens in assorted colors.BuyPlush Elk$').click();
    await page.getByRole('heading', { name: 'Demo Store' }).click();
  });
});