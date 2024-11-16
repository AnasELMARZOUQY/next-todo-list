import { test, expect, Page } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000")
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark")
  })
})

async function addTodoItem(page: Page, description = "Test Todo Description") {
  await page.waitForSelector('input[placeholder="User"]')
  await page.fill('input[placeholder="User"]', "Test User")

  await page.waitForTimeout(1000)

  await page.waitForSelector('input[placeholder="Description"]')
  await page.fill('input[placeholder="Description"]', description)

  await page.waitForTimeout(500)

  const countrySelect = page.locator("#country-select")
  await countrySelect.waitFor({ state: "visible" })

  await countrySelect.selectOption({ label: "United States" })

  const selectedValue = await countrySelect.inputValue()
  expect(selectedValue).toBe("United States")

  const addButton = await page.waitForSelector('button:has-text("Add Todo")')
  expect(await addButton.isEnabled()).toBe(true)
  await addButton.click()

  await page.waitForTimeout(1000)

  const todoItemLocator = page.locator("#todo-item")
  await expect(todoItemLocator).toBeVisible()
}

test("should add a new todo", async ({ page }) => {
  await addTodoItem(page)

  const todoItemLocator = page.locator("#todo-item")
  await expect(todoItemLocator).toBeVisible()
})

test("should filter completed and pending todos", async ({ page }) => {
  await addTodoItem(page)

  const check = await page.waitForSelector('button:has-text("Check")')
  expect(await check.isEnabled()).toBe(true)
  await check.click()

  const filterSelect = page.locator("#filter")
  await filterSelect.waitFor({ state: "visible" })

  await filterSelect.selectOption({ label: "Completed" })

  const selectedValue = await filterSelect.inputValue()
  expect(selectedValue).toBe("completed")

  const uncheck = await page.waitForSelector('button:has-text("Uncheck")')
  expect(await uncheck.isEnabled()).toBe(true)
  await uncheck.click()

  await filterSelect.waitFor({ state: "visible" })

  await filterSelect.selectOption({ label: "Pending" })
  const newValue = await filterSelect.inputValue()
  expect(newValue).toBe("pending")
})

test("should toggle a todo as completed or pending", async ({ page }) => {
  await addTodoItem(page)

  // Toggle the first todo item to completed
  await page.click('#todo-item:first-child button:has-text("Check")')
  let isCompleted = await page.locator("#todo-item:first-child")

  // Toggle it back to pending
  await page.click('#todo-item:first-child button:has-text("Uncheck")')
  isCompleted = await page.locator("#todo-item:first-child")
})

test("should delete a todo item", async ({ page }) => {
  await addTodoItem(page)

  const initialTodoCount = await page.$$eval("#todo-item", (todos) => todos.length)

  await page.click('#todo-item:first-child button:has-text("Delete")')

  await page.waitForTimeout(500)
  const finalTodoCount = await page.$$eval("#todo-item", (todos) => todos.length)
  expect(finalTodoCount).toBe(initialTodoCount - 1)
})
