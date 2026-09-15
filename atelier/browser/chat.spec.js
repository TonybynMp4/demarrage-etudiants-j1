import { test, expect } from '@playwright/test';

test('envoyer un message affiche deux entrées (question et réponse)', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Votre message').fill('salut');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  const messages = page.locator('#messages li');
  await expect(messages).toHaveCount(2);
  await expect(messages.nth(0)).toHaveText('Vous : salut');
  await expect(messages.nth(1)).toContainText('Cap Web :');
});
