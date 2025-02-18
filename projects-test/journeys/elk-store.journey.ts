import { journey, step, monitor, expect, Page } from '@elastic/synthetics';

const TEST_URL = 'https://react-elk-store.vercel.app/';

journey('Shopping Cart Test for React Elk Store', ({ page }: { page: Page }) => {
  monitor.use({
    id: 'react-elk-store-cart-check',
    schedule: 10,
  });

  step('Launch the application', async () => {
    await page.goto(TEST_URL, { waitUntil: 'load', timeout: 15000 });
  });

  step('Check for page load', async () => {
    const storeHeader = page.getByRole('heading', { level: 1 });
    await storeHeader.waitFor({ state: 'visible', timeout: 10000 });
    await expect(storeHeader).toHaveText('Elk Store', { timeout: 10000 });
  });

  step('Add item to cart and check cart count', async () => {
    // Find first product card and its Add to Cart button
    const firstProductCard = page.getByTestId('product-card').first();
    const addToCartButton = firstProductCard.getByTestId('add-to-cart-button');
    await addToCartButton.waitFor({ state: 'visible', timeout: 7000 });
    
    // Click the Add to Cart button
    await addToCartButton.click();
    
    // Look for the cart button and check its badge
    const cartButton = page.getByTestId('cart-button');
    
    // Wait for the cart quantity to appear in the button
    await page.waitForFunction(() => {
      const cartBtn = document.querySelector('[data-testid="cart-button"]');
      return cartBtn && cartBtn.querySelector('span.absolute');
    }, { timeout: 7000 });
    
    // Verify the cart badge shows "1"
    const cartQuantity = await cartButton.evaluate(button => {
      const badge = button.querySelector('span.absolute');
      return badge ? badge.textContent.trim() : null;
    });
    
    expect(cartQuantity).toBe('1');
  });

  step('Proceed to checkout', async () => {
    // Open the cart first
    const cartButton = page.getByTestId('cart-button');
    await cartButton.click();
    
    // Wait for the checkout button to appear in the cart sidebar
    const checkoutButton = page.getByText('Checkout');
    await checkoutButton.waitFor({ state: 'visible', timeout: 7000 });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
  });

  step('Monitor page performance', async () => {
    const performance = await page.evaluate(() => JSON.stringify(window.performance));
    console.log(performance);
  });
});
