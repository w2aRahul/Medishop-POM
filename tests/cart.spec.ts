import { test } from './fixtures';

// Logs in (via fixture), opens the full products list from the home page,
// adds Paracetamol 500mg to the cart, and checks the cart badge shows 1 item.
test('add a popular product to the cart', async ({ loggedInHome }) => {
  const products = await loggedInHome.seeAllPopular();

  await products.expectProductVisible('Paracetamol 500mg');
  await products.addToCart('Paracetamol 500mg');
    
  await products.navBar.expectCartCount(1);
});