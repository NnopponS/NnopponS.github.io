import { chromium } from 'playwright-core'
import assert from 'node:assert/strict'

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175'
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] })
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
  const errors = []
  for (const page of [desktop, mobile]) {
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url())
    })
  }
  async function open(page, route) {
    const response = await page.goto(base + route)
    assert.equal(response?.status(), 200, route)
    await page.locator('main h1').waitFor()
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'No horizontal overflow at ' + route)
  }
  async function photosLoad(page) {
    const failed = await page.locator('main img').evaluateAll(async images => {
      return (await Promise.all(images.map(async image => {
        image.loading = 'eager'
        try { await image.decode(); return image.alt && image.naturalWidth > 0 ? '' : image.src }
        catch { return image.src }
      }))).filter(Boolean)
    })
    assert.deepEqual(failed, [])
  }
  await open(desktop, '/')
  await photosLoad(desktop)
  const missingAnchors = await desktop.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute('href').slice(1)).filter(id => !document.getElementById(id)))
  assert.deepEqual(missingAnchors, [])
  await desktop.locator('.chapter-nav a').nth(0).click()
  await desktop.waitForFunction(() => document.querySelector('.chapter-nav a[aria-current]')?.textContent === '01')
  await desktop.locator('.chapter-nav a').nth(3).click()
  await desktop.waitForFunction(() => document.querySelector('.chapter-nav a[aria-current]')?.textContent === '04')
  assert.equal(await desktop.locator('.stage-image.active img').getAttribute('src'), '/fieldnotes/singapore.webp')
  await desktop.locator('.chapter-nav a').nth(4).click()
  await desktop.waitForFunction(() => document.querySelector('.chapter-nav a[aria-current]')?.textContent === '05')
  assert.equal(await desktop.locator('.stage-image.active img').getAttribute('src'), '/fieldnotes/innoserve.webp')
  await desktop.getByRole('button', { name: 'Research' }).click()
  assert.equal(await desktop.locator('.honor-list article').count(), 1)
  assert.match(await desktop.locator('.honor-list').innerText(), /Best Paper Award/)
  await desktop.getByRole('button', { name: 'All', exact: true }).click()
  await desktop.getByRole('button', { name: 'View all 13 honors' }).click()
  assert.equal(await desktop.locator('.honor-list article').count(), 13)
  assert.match(await desktop.locator('.honor-list').innerText(), /HIC Thailand/)
  await open(mobile, '/')
  await photosLoad(mobile)
  assert.equal(await mobile.locator('.chapter-photo').last().isVisible(), true)
  assert.equal(await mobile.locator('.stage-frame').isVisible(), false)
  assert.equal(await mobile.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto')
  await mobile.getByRole('button', { name: 'Open menu' }).click()
  await mobile.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work' }).click()
  assert.equal(await mobile.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false')
  assert.equal(new URL(mobile.url()).hash, '#work')
  for (const route of ['/wheelsense/', '/wheelathlete/', '/cv.html']) {
    for (const page of [desktop, mobile]) {
      await open(page, route)
      await photosLoad(page)
    }
  }
  const anchors = ['/wheelsense/#easeai', '/wheelathlete/#workflow']
  for (const route of anchors) {
    await open(desktop, route)
    assert.equal(await desktop.locator(new URL(base + route).hash).count(), 1)
  }
  assert.deepEqual(errors, [])
  if (process.env.SCREENSHOT_DIR) {
    await open(desktop, '/')
    await desktop.screenshot({ path: process.env.SCREENSHOT_DIR + '/home-desktop.png' })
    await open(mobile, '/')
    await mobile.screenshot({ path: process.env.SCREENSHOT_DIR + '/home-mobile.png' })
    await open(desktop, '/#journey-chapter-4')
    await desktop.screenshot({ path: process.env.SCREENSHOT_DIR + '/story-desktop.png' })
    await open(mobile, '/wheelsense/')
    await mobile.screenshot({ path: process.env.SCREENSHOT_DIR + '/wheelsense-mobile.png' })
  }
  console.log('Portfolio: desktop/mobile across 4 pages, images, anchor targets, chapter swaps, honors filtering and expanded results, mobile nav, reduced motion: pass.')
} finally {
  await browser.close()
}
