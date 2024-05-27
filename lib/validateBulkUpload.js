const Validator = require("jsonschema").Validator;
const v = new Validator();

async function validateBulkUploadSchema(productJsonData, schema) {
  try {
    let len = productJsonData.length;
    const failedValidation = [];
    const passedValidation = [];
    for (let i = 0; i < len; i++) {
      const valid = v.validate(productJsonData[i], schema);

      if (valid.errors.length == 0) {
        delete productJsonData[i].serial;
        passedValidation.push(productJsonData[i]);
      }

      valid.errors.forEach((error) => {
        failedValidation.push({ [`Serial no. ${i + 1}`]: error.stack });
      });
    }

    return { passedValidation, failedValidation };
  } catch (error) {
    throw error;
  }
}

module.exports = validateBulkUploadSchema;
