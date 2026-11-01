

import {
  validateRecord,
  normalizeRecord,
  filterRecords,
  searchRecords,
  sortRecords,
  summarizeRecords,
  buildReport
} from "./toolkit.js";

// Compare expected and actual results
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


 // Test 5: Filter books by category
const testBooks = [
  { title: "Robot Garden", category: "Science" },
  { title: "Color World", category: "Art" },
  { title: "Space Trip", category: "Science" }
];

check(
  "Filter Science books",
  ["Robot Garden", "Space Trip"],
  filterRecords(testBooks, (book) => book.category === "Science")
    .map((book) => book.title)
);


// Test 6: Search ignores capital letters
const searchBooks = [
  { title: "Robot Garden", creator: "Mina Reed" },
  { title: "Color World", creator: "Alex Brown" }
];

check(
  "Search ignores capitalization",
  ["Robot Garden"],
  searchRecords(searchBooks, "ROBOT").map((book) => book.title)
);

// Test 7: Search by creator
check(
  "Search by creator",
  ["Robot Garden"],
  searchRecords(searchBooks, "mina").map((book) => book.title)
);


// Test 8: Sort books by minutes
const sortBooks = [
  { title: "Zebra Book", minutes: 60 },
  { title: "Apple Book", minutes: 30 },
  { title: "Banana Book", minutes: 60 }
];

check(
  "Sort books by minutes",
  ["Apple Book", "Banana Book", "Zebra Book"],
  sortRecords(sortBooks, "minutes").map((book) => book.title)
);



 // Test 9: Make sure sorting doesn't change the original
const originalBooks = JSON.stringify(sortBooks);

sortRecords(sortBooks, "minutes");

check(
  "Sorting does not change original",
  originalBooks,
  JSON.stringify(sortBooks)
);


// Test 10: Count books and add minutes
check(
  "Summarize books",
  { count: 3, totalMinutes: 150 },
  summarizeRecords(sortBooks)
);

// Test 11: Empty list
check(
  "Empty list summary",
  { count: 0, totalMinutes: 0 },
  summarizeRecords([])
);


// Test 12: Build a report
const reportBooks = [
  { title: "Robot Garden", creator: "Mina", minutes: 120 },
  { title: "Robot World", creator: "Alex", minutes: 60 },
  { title: "Color Book", creator: "Sam", minutes: 30 }
];

check(
  "Build book report",
  {
    books: [
      { title: "Robot World", creator: "Alex", minutes: 60 },
      { title: "Robot Garden", creator: "Mina", minutes: 120 }
    ],
    summary: { count: 2, totalMinutes: 180 }
  },
  buildReport(reportBooks, "robot")
);



import books from "./data/books.json" with { type: "json" };

// Test 13: Check all 8 books
check(
  "Real dataset book count",
  8,
  books.length
);

// Test 14: Total reading minutes
check(
  "Real dataset summary",
  { count: 8, totalMinutes: 1410 },
  summarizeRecords(books)
);

// Test 15: Search real books
check(
  "Search Robot Garden",
  ["Robot Garden"],
  searchRecords(books, "robot").map(book => book.title)
);






