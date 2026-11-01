
import { validateRecord, normalizeRecord } from "./toolkit.js";// Compare the expected and actual results.
function check(name, expected, actual) {
  const result = JSON.stringify(expected) === JSON.stringify(actual)
    ? "PASS"
    : "FAIL";

  console.log(`${result} ${name}`);
  console.log("Expected:", JSON.stringify(expected));
  console.log("Actual:", JSON.stringify(actual));
}

// Test 1: A book without a title
const book = {
  id: 1,
  minutes: 30
};

check(
  "Missing title",
  { valid: false, errors: ["title is required"] },
  validateRecord(book)
);



 // Test 2: A book with invalid minutes
const invalidBook = {
  id: 2,
  title: "Robot Garden",
  minutes: "thirty"
};

check(
  "Invalid minutes",
  { valid: false, errors: ["minutes must be a number"] },
  validateRecord(invalidBook)
);


 // Test 3: Remove extra spaces
const messyBook = {
  id: 3,
  title: "  Robot Garden  ",
  creator: "  Mina Reed  ",
  category: "  Science  ",
  minutes: 120,
  description: "  A book about robots  "
};

check(
  "Normalize book",
  "Robot Garden",
  normalizeRecord(messyBook).title
);

// Test 4: Make sure the original book stays the same
check(
  "Original book unchanged",
  "  Robot Garden  ",
  messyBook.title
);

