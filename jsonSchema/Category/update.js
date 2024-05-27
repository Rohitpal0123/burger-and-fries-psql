module.exports = {
  type: "object",
  properties: {
    category: {
      type: String,
      enum: ["burger", "drinks", "addons"]
    }
  },
  required: ["category"]
};
