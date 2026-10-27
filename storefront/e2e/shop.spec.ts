import { expect, test } from "@playwright/test"

// Uses the demo catalogue from `yarn seed` in backend/.

test.describe("languages", () => {
  test("sends visitors to their browser language, Marathi by default", async ({ browser }) => {
    const hindi = await browser.newContext({ locale: "hi-IN" })
    const page = await hindi.newPage()
    await page.goto("/")
    await expect(page).toHaveURL(/\/hi$/)
    await hindi.close()

    const other = await browser.newContext({ locale: "fr-FR" })
    const page2 = await other.newPage()
    await page2.goto("/store")
    await expect(page2).toHaveURL(/\/mr\/store$/)
    await expect(page2.locator("html")).toHaveAttribute("lang", "mr")
    await other.close()
  })

  test("shows product text in the chosen language", async ({ page }) => {
    await page.goto("/mr/products/ryzen-5-5600gt-gaming-pc")
    await expect(page.getByTestId("pdp-title")).toHaveText("Ryzen 5 5600GT गेमिंग आणि परफॉर्मन्स पीसी")
    await page.goto("/hi/products/ryzen-5-5600gt-gaming-pc")
    await expect(page.getByTestId("pdp-title")).toHaveText("Ryzen 5 5600GT गेमिंग और परफ़ॉर्मेंस पीसी")
    await page.goto("/en/products/ryzen-5-5600gt-gaming-pc")
    await expect(page.getByTestId("pdp-title")).toHaveText("Ryzen 5 5600GT Gaming & Performance PC")
  })
})

test("listing: filter by brand and sort by price", async ({ page, isMobile }) => {
  await page.goto("/en/categories/laptops")
  await expect(page.getByTestId("listing-title")).toContainText("Laptops")
  const cards = page.getByTestId("product-card")
  expect(await cards.count()).toBeGreaterThan(1)

  if (isMobile) {
    await page.getByTestId("open-filters").click()
    await page.getByTestId("filter-brand-MSI").filter({ visible: true }).click()
    await expect(page).toHaveURL(/brand=MSI/)
    await page.getByTestId("apply-filters").click()
  } else {
    await page.getByTestId("filter-brand-MSI").filter({ visible: true }).click()
    await expect(page).toHaveURL(/brand=MSI/)
  }
  await expect(cards).toHaveCount(1)
  await expect(cards.first()).toContainText("MSI Thin GF63")

  if (!isMobile) {
    await page.goto("/en/categories/laptops?sort=price-asc")
    const amounts = await page
      .getByTestId("product-card")
      .getByTestId("product-price")
      .evaluateAll((els) => els.map((el) => Number(el.getAttribute("data-amount"))))
    expect(amounts.length).toBeGreaterThan(1)
    expect([...amounts].sort((a, b) => a - b)).toEqual(amounts)
  }
})

test("product: choose a configuration, specs and price follow, add to cart", async ({ page }) => {
  await page.goto("/en/products/hp-15s-laptop")
  // Starts on the cheapest configuration
  await expect(page.getByTestId("product-price").first()).toHaveAttribute("data-amount", "36990")
  await expect(page.locator("#specifications")).toContainText("Intel Core i3-1215U")

  await page.getByRole("radio", { name: /Core i5/ }).click()
  await expect(page.getByTestId("product-price").first()).toHaveAttribute("data-amount", "52990")
  await expect(page.locator("#specifications")).toContainText("Intel Core i5-1235U")

  await page.getByTestId("add-product-button").click()
  await expect(page.getByTestId("go-to-bag")).toBeVisible()
  await page.getByTestId("go-to-bag").click()
  await expect(page).toHaveURL(/\/en\/cart/)
  await expect(page.getByTestId("bag-item")).toContainText("Core i5 · 16GB · 512GB")
})

test("product card: add straight to the cart", async ({ page }) => {
  await page.goto("/en/categories/graphics-cards")
  await page.getByTestId("product-card").filter({ hasText: "RTX 3050" }).getByTestId("quick-add").click()
  await expect(page.getByTestId("quick-go-to-cart")).toBeVisible()
})

test("product: few left, and pincode check", async ({ page }) => {
  // One left in the demo data
  await page.goto("/en/products/apple-mac-mini-m4-open-box")
  await expect(page.getByTestId("low-stock")).toHaveText("Only 1 left")

  await page.getByTestId("pincode-input").fill("12345")
  await page.getByRole("button", { name: "Check" }).click()
  await expect(page.getByTestId("pincode-result")).toContainText("valid 6-digit")
  // Answers come from the courier check (the fake Shiprocket in tests: 9… not served, 8… no COD)
  await page.getByTestId("pincode-input").fill("431203")
  await page.getByRole("button", { name: "Check" }).click()
  await expect(page.getByTestId("pincode-result")).toContainText("Delivery by")
  await expect(page.getByTestId("pincode-result")).toContainText("Cash on delivery available")
  await page.getByTestId("pincode-input").fill("800001")
  await page.getByRole("button", { name: "Check" }).click()
  await expect(page.getByTestId("pincode-result")).toContainText("not available here")
  await page.getByTestId("pincode-input").fill("900001")
  await page.getByRole("button", { name: "Check" }).click()
  await expect(page.getByTestId("pincode-result")).toContainText("do not deliver")
})

test("wishlist: save from a product card and see it on the wishlist page", async ({ page }) => {
  await page.goto("/en/categories/graphics-cards")
  await page.getByTestId("product-card").filter({ hasText: "RTX 3050" }).getByTestId("wishlist-toggle").click()
  await page.goto("/en/wishlist")
  await expect(page.getByTestId("wishlist-items").getByTestId("product-card")).toHaveCount(1)
  await expect(page.getByTestId("wishlist-items")).toContainText("RTX 3050")
})

test("search: English words on the Marathi site, specs, typos, suggestions", async ({ page, isMobile }) => {
  await page.goto("/mr/search?q=laptop")
  await expect(page.getByTestId("product-card").first()).toContainText("Laptop")
  await page.goto("/mr/search?q=rtx 3050")
  await expect(page.getByTestId("product-card").first()).toBeVisible()
  await page.goto("/en/search?q=prnter")
  await expect(page.getByTestId("product-card").first()).toContainText("Printer")

  // Suggestions while typing
  await page.goto("/en")
  const box = page.getByTestId("search-input").filter({ visible: true })
  await box.fill("macbook")
  await expect(page.getByRole("option").first()).toContainText("MacBook")
  if (!isMobile) {
    await box.press("ArrowDown")
    await box.press("Enter")
    await expect(page).toHaveURL(/\/en\/products\/apple-macbook-air-13/)
  }
})

test("custom PC: the form opens WhatsApp with the answers", async ({ page }) => {
  await page.goto("/en/custom-pc")
  // Catch the WhatsApp link instead of opening it
  await page.evaluate(() => {
    ;(window as unknown as { opened: string[] }).opened = []
    window.open = (url) => {
      ;(window as unknown as { opened: string[] }).opened.push(String(url))
      return null
    }
  })
  await page.getByRole("button", { name: "₹60,000 – ₹90,000" }).click()
  await page.getByRole("button", { name: "Gaming" }).click()
  await page.getByLabel("Your name").fill("Rahul")
  await page.getByTestId("custom-pc-form").getByRole("button", { name: "Send on WhatsApp" }).click()
  const url = decodeURIComponent(await page.evaluate(() => (window as unknown as { opened: string[] }).opened[0]))
  expect(url).toContain("919307570781")
  expect(url).toContain("₹60,000 – ₹90,000")
  expect(url).toContain("Gaming")
  expect(url).toContain("Rahul")
})
