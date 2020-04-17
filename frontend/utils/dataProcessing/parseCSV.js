import Papa from 'papaparse';
import {intersection, snakeCase} from 'lodash-es';

/**
 * The mandatory csv fields to process addresses
 */
const requiredFields = ['street_address', 'city', 'state', 'zipcode'];

/**
 * Converts some common similar names to the required field names to be nice to people who don't read instructions
 * @param {string} originalHeader - The header of a CSV column to transform
 */
const transformHeader = originalHeader => {
  const header = snakeCase(originalHeader);

  switch (header) {
    case 'zip':
    case 'zip_code':
    case 'postcode':
    case 'post_code':
    case 'postalcode':
    case 'postal_code':
      return 'zipcode';

    case 'address':
    case 'streetaddress':
    case 'street1':
    case 'street_1':
    case 'address1':
    case 'address_1':
    case 'addressline1':
      return 'street_address';

    case 'unit':
    case 'apt':
    case 'apartment':
    case 'number':
    case 'streetaddress2':
    case 'street2':
    case 'address2':
    case 'address_2':
    case 'addressline2':
      return 'unit';

    case 'province':
    case 'region':
    case 'statecode':
    case 'state_code':
      return 'state';

    default:
      return header;
  }
};

/**
 * Builds a standard error message for CSV errors
 * @param {Object[]} errors - Error objects from PapaParse @see https://www.papaparse.com/docs#errors
 */
const buildErrorMessages = errors =>
  errors.map(error => `CSV error on row ${error.row}. ${error.message}.`);

/**
 * Function to call when PapaParse has completed it's work
 * @param {Object[]} results - PapaParse results object @see https://www.papaparse.com/docs#results
 * @param {function} success - Function to return on success with results
 * @param {function} error - Function to return on error with error messages
 */
const parsingComplete = (results, success, error) => {
  // Check for parsing errors
  if (results.errors.length > 0) {
    return error(buildErrorMessages(results.errors));
  }

  // Check for missing required fields
  if (
    intersection(results.meta.fields, requiredFields).length !==
    requiredFields.length
  ) {
    return error([
      `The .csv file must contain the following fields: ${requiredFields.join(
        ', '
      )}.`,
    ]);
  }

  return success(results);
};

/**
 * Runs PapaParse on the CSV file
 * @param {File} file - The CSV to parse
 * @param {function} complete - The function to call when parsing is complete
 * @param {function} error - The function to call when there has been an error in parsing
 */
const _parseCSV = (file, resolve, reject) => {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return reject(['Unable to process: not a .csv file.']);
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    transformHeader: header => transformHeader(header),
    complete: results => parsingComplete(results, resolve, reject),
    error: errors => reject(buildErrorMessages(errors)),
  });
};

/**
 * Promise wrapper for PapaParse calls
 * @param {File} file - The CSV to parse
 * @returns {Promise} A promise that returns the parsed CSV when resolved and errors when rejected
 */
const parseCSV = file =>
  new Promise((resolve, reject) => _parseCSV(file, resolve, reject));

export {requiredFields, parseCSV as default};
