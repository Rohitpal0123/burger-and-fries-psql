module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      minLength: 5,
      maxLength: 75,
    },
    code: {
      type: "string",
      minLength: 5,
      maxLength: 75,
    },
    category: {
      type: "string",
      enum: ["burger", "drinks", "addons"],
    },
    foodType: {
      type: "string",
      enum: ["veg", "non-veg"],
    },
    price: {
      type: "integer",
      minimum: 0,
      maximum: 30,
    },
    description: {
      type: "string",
      minLength: 10,
      maxLength: 100,
    },
  },
};
