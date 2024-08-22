const { journey, step, expect } = require('@elastic/synthetics');

journey('Recorded journey Demo', async ({ page, context }) => {
  step('Go to https://demo-store-ivory.vercel.app/products', async () => {
    await page.goto('https://demo-store-ivory.vercel.app/products');
    await page.getByRole('link', { name: 'Home' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Coffee Mug\$15A coffee mug!Buy$/ }).locator('[data-test="buy-button"]').click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Set of Pens\$10Pens in assorted colors\.Buy$/ }).locator('[data-test="buy-button"]').click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('div').filter({ hasText: /^Plush Elk\$16Elastic Elk!Buy$/ }).locator('[data-test="buy-button"]').click();
  });
});