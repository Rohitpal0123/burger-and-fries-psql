const xlsx = require("xlsx");
const bulkUploadSchema = require("../../jsonSchema/Bulk-upload/add");
const Product = require("../../models/product.model");
const validateBulkUploadSchema = require("../../lib/validateBulkUpload");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class uploadProduct {
  async insertMany(finalProduct) {
    try {
      const newBulkProducts = await Product.insertMany(finalProduct);

      if (!newBulkProducts) throw new apiError(500, "Products not added !");
    } catch (error) {
      throw error;
    }
  }

  async convertExcelToJson(fileContent) {
    try {
      const dataBuffer = Buffer.isBuffer(fileContent)
        ? fileContent
        : Buffer.from(fileContent);

      const workbook = xlsx.read(dataBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Use { header: 1 } option to treat the first row as headers
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      return jsonData;
    } catch (error) {
      throw error;
    }
  }

  process = asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = req.file.buffer;

    const jsonData = await this.convertExcelToJson(fileContent);
    const result = await validateBulkUploadSchema(jsonData, bulkUploadSchema);

    const finalProduct = result.passedValidation;
    const createProduct = await this.insertMany(finalProduct);
    if (!createProduct) throw new apiError(500, "Product not uploaded!");
    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: result.failedValidation,
    });
  });
}
module.exports = new uploadProduct();
