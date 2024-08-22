step('Go to https://demo-store-ivory.vercel.app/products', async () => {
  await page.goto('https://demo-store-ivory.vercel.app/products');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div').filter({ hasText: /^Coffee Mug\$15A coffee mug!Buy$/ }).locator('[data-test="buy-button"]').click();
  await page.getByText('Pens in assorted colors.').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div').filter({ hasText: /^Set of Pens\$10Pens in assorted colors\.Buy$/ }).locator('[data-test="buy-button"]').click();
});
