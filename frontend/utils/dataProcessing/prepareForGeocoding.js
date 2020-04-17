import {trim, some} from 'lodash-es';
import md5 from 'crypto-js/md5';
import {requiredFields} from 'utils/dataProcessing/parseCSV';

/**
 * Checks for rows that are missing values in the required fields
 * @param {Object} row - The row to check for required fields
 * @returns {boolean} True if there are empty fields, false if there aren't
 */
const checkEmptyFields = row => {
  const fieldsToCheck = requiredFields.map(field => trim(row[field]));
  return some(fieldsToCheck, fieldToCheck => fieldToCheck.length === 0);
};

/**
 * Adds an `id` field to the row object which is an MD5 hash of the stringified object itself
 * @param {Object} row - The object to convert into an an MD5 hash
 * @returns {Object} The passed in row with an added id field
 */
const createId = row => {
  const id = md5(JSON.stringify(row)).toString();
  return {id, ...row};
};

/**
 * Checks for duplicate rows in the database
 * @param {Object} rowWithId - The row to check for in the database
 * @param {number[]} existingIds - The ids of existing database records
 * @returns {boolean} True if the row already exists, false if it doesn't
 */
const removeDuplicates = (rowWithId, existingIds) =>
  existingIds.includes(rowWithId.id);

/**
 * Checks data for required fields and returns good rows, bad rows, and duplicate rows
 * @param {Object[]} data - The data to prepare
 * @returns {Object} `accepted`, `rejected`, and `duplicate` keys contain the arrays of rows with required fields, those without, and those already in the database
 */
const prepareForGeocoding = (data, existingIds) => {
  const accepted = [];
  const rejected = [];
  const duplicate = [];

  // Call prep functions on each row, then put into the correct arrays
  data.forEach(row => {
    // Reject rows with empty required fields
    const hasEmptyFields = checkEmptyFields(row);
    if (hasEmptyFields) {
      return rejected.push(row);
    }

    // Create an ID for valid rows to compare with existing records
    const rowWithId = createId(row);

    // Reject rows with matching IDs in existing records
    const isDuplicate = removeDuplicates(rowWithId, existingIds);
    if (isDuplicate) {
      return duplicate.push(row);
    }

    // Accept rows that pass those checks
    return accepted.push(rowWithId);
  });

  return {
    accepted,
    rejected,
    duplicate,
  };
};

export default prepareForGeocoding;
