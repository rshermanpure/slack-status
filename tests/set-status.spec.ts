import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const authFile = ".auth/user.json";

test.use({ storageState: authFile });

function getStatus(): string {
  const records = parse(fs.readFileSync(path.join(__dirname, "input.csv")), {
    columns: false,
    skip_empty_lines: true,
  });

  // const line = Math.floor(Math.random() * records.length) // returns a random status

  // NEW: returns status based on day of month 
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();

  return records[dayOfMonth % records.length][0];
}

test("update-status", async ({ page }) => {
  const status = getStatus()

  await page.goto(process.env.SLACK_URL);
  const title = new RegExp(process.env.SLACK_TITLE)

  await expect(page).toHaveTitle(title); // Ensure the page has loaded

  await page.getByTestId('user-button').click();
  await page.getByTestId('main-menu-custom-status-item').click();

  await expect(page.getByTestId('custom_status_input_go')).toHaveText('Save') // Make sure there's not already a status.

  await page.getByRole('paragraph').click();
  await page.getByTestId('custom_status_input_body').getByLabel('Status').fill(status);
  await page.getByTestId('custom_status_input_go').click();
});