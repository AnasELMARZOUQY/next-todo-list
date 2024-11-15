import test from "@playwright/test";

test('should toggle between light and dark mode', async ({ page }) => {
  await page.goto('http://localhost:3000'); 

  const toggleButton = page.locator('button:has-text("Toggle theme")');
  await toggleButton.click();

  const lightModeOption = page.locator('text=Light');
  await lightModeOption.click();

  await toggleButton.click();
  const darkModeOption = page.locator('text=Dark');
  await darkModeOption.click();

  await toggleButton.click();
  const systemModeOption = page.locator('text=System');
  await systemModeOption.click();
});