import { test, expect, Page } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000")
  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark")
  })
})

// Helper function to add a new todo item with delays and verification
async function addTodoItem(page:Page, description = "Test Todo Description") {
  // Wait for form fields to be ready
  await page.waitForSelector('input[placeholder="User"]')
  await page.fill('input[placeholder="User"]', "Test User")

  // Explicit delay after filling the user field to allow next field to load fully
  await page.waitForTimeout(5000)

  
  await page.waitForSelector('input[placeholder="Description"]')
  await page.fill('input[placeholder="Description"]', description)

   // Another explicit delay after selecting country
   await page.waitForTimeout(500)


   // Delay after filling the description field
   await page.waitForTimeout(500)

  // Click on the country dropdown and select the country
  const countryDropdown = page.locator('select[name="country"]');
  await countryDropdown.click();
  const afghanistanOption = page.locator('option:has-text("Afghanistan")');
  await afghanistanOption.click();

  const addButton = await page.waitForSelector('button:has-text("Add Todo")')
  expect(await addButton.isEnabled()).toBe(true) // Ensure button is enabled
  await addButton.click()

  // Verify the todo item is added
  await page.waitForSelector(".todo-item:last-child .description")
}

test("should add a new todo with a real country selection", async ({ page }) => {
  await addTodoItem(page)

  // Verify the new todo item appears in the list with the expected description
  const todoDescription = await page.locator(".todo-item:last-child .description").textContent()
  expect(todoDescription).toBe("Test Todo Description")
})

test("should filter completed and pending todos", async ({ page }) => {
  await addTodoItem(page) // Add an item to filter

  // Mark the item as completed to test filtering
  await page.click(".todo-item:first-child .toggle")

  // Filter completed todos and verify only completed todos are shown
  await page.selectOption('select[name="filter"]', "completed")
  const completedTodos = await page.$$(".todo-item.completed")
  expect(completedTodos.length).toBeGreaterThan(0)

  // Filter pending todos and verify only pending todos are shown
  await page.selectOption('select[name="filter"]', "pending")
  const pendingTodos = await page.$$(".todo-item:not(.completed)")
  expect(pendingTodos.length).toBeGreaterThan(0)
})

test("should toggle a todo as completed or pending", async ({ page }) => {
  await addTodoItem(page) // Add an item to toggle

  // Toggle the first todo item to completed
  await page.click('.todo-item:first-child button:has-text("Check")')
  let isCompleted = await page.locator(".todo-item:first-child").getAttribute("class")
  expect(isCompleted).toContain("completed")

  // Toggle it back to pending
  await page.click('.todo-item:first-child button:has-text("Uncheck")')
  isCompleted = await page.locator(".todo-item:first-child").getAttribute("class")
  expect(isCompleted).not.toContain("completed")
})

test("should delete a todo item", async ({ page }) => {
  await addTodoItem(page) // Add an item to delete

  // Get the count of todo items before deletion
  const initialTodoCount = await page.$$eval(".todo-item", (todos) => todos.length)

  // Delete the first todo item
  await page.click('.todo-item:first-child button:has-text("Delete")')

  // Verify item count has decreased
  await page.waitForTimeout(500)
  const finalTodoCount = await page.$$eval(".todo-item", (todos) => todos.length)
  expect(finalTodoCount).toBe(initialTodoCount - 1)
})
