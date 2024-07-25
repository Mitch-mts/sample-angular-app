describe('InsureWorX', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4200');
  });

  it('should be titled "InsureWorX"', async () => {
    await expect(page.title()).resolves.toMatch('InsureWorX');
  }, 10000);
});