// Assignment 3: JavaScript Data Toolkit
//
// Write and export your seven functions in this file. You may use these names:
//
//   validateRecord(record)            returns useful error information for one record
//   normalizeRecord(record)           returns a cleaned copy; never changes the original record
//   filterRecords(records, condition) returns the records that match a condition you pass in
//   searchRecords(records, query)     matches 2+ properties, ignoring capitalization
//   sortRecords(records, property)    returns a new sorted array; never changes the original array
//   summarizeRecords(records)         returns a summary, such as a count, total, or average
//   buildReport(records, query)       combines at least two of the functions above
//
// Above each function, write a short comment: what it takes, what it returns,
// and whether it changes its input. Decide your tie rule for equal values
// and the shape of your validation errors before you write the code.



/*
 * Takes one book record.
 * Returns whether it is valid and a list of errors.
 * Does not change the original record.
 */
export function validateRecord(record) {
  const errors = [];

  if (!record || typeof record !== "object") {
    return { valid: false, errors: ["Record must be an object"] };
  }

  if (typeof record.title !== "string" || record.title.trim() === "") {
    errors.push("title is required");
  }

  if (typeof record.minutes !== "number" || !Number.isFinite(record.minutes)) {
    errors.push("minutes must be a number");
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}



/*
 * Takes one book record.
 * Returns a new copy with extra spaces removed.
 * Does not change the original record.
 */
export function normalizeRecord(record) {
  return {
    ...record,
    title: record.title.trim(),
    creator: record.creator.trim(),
    category: record.category.trim(),
    description: record.description.trim()
  };
}


/*
 * Takes a list of books and a condition.
 * Returns only the books that match.
 * Does not change the original list.
 */
export function filterRecords(records, condition) {
  return records.filter(condition);
}



/*
 * Takes a list of books and a search word.
 * Returns books that match the title or creator.
 * Ignores capital letters and does not change the list.
 */
export function searchRecords(records, query) {
  const word = String(query).toLowerCase();

  return records.filter((book) =>
    String(book.title ?? "").toLowerCase().includes(word) ||
    String(book.creator ?? "").toLowerCase().includes(word)
  );
}



/*
 * Takes a list of books and a property.
 * Returns a new sorted list.
 * Does not change the original list.
 * Equal minutes are sorted by title.
 */
export function sortRecords(records, property) {
  return [...records].sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;

    return String(a.title).localeCompare(String(b.title));
  });
}

