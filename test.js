const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  const breach_name = "Adobe";

  const base_url = 'https://monitor.firefox.com/';
  const breach_url = new URL('/breaches', base_url).href;
  const breach_detail_url = new URL(`/breach-details/${breach_name}`, base_url).href;

  const search_breaches_locator = '[placeholder="Search Breaches"]';

  await page.goto(base_url);

  await page.click('a:has-text("Breaches")');
  expect(page.url()).toBe(breach_url);

  await page.click(search_breaches_locator);
  await page.type(search_breaches_locator, breach_name, {delay: 100});

  await page.click(`text=${breach_name}`);
  expect(page.url()).toBe(breach_detail_url);

  await page.click('text=Website Breach');
  expect(page.url()).toBe(`${breach_detail_url}#what-is-this-breach`);
});
