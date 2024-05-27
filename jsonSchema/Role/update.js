module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    role: {
      type: "string",
      enum: ["manager", "employee", "customer"]
    },
    isActive: {
      type: "boolean"
    }
  }
};
