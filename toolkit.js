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
