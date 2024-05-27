const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Customer = require("../models/customer.model");

const authenticateUser = async (req, res, next) => {
  let token;

  try {
    req.cookies;
    if (req.cookies?.jwt) {
      // Get token from header
      token = req.cookies?.jwt;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }
      req.isUser = isUser;
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

const authenticateManager = async (req, res, next) => {
  try {
    const managerRole = await Role.findOne({ role: "manager" });
    if (req.isUser && req.isUser.role.equals(managerRole._id)) {
      next();
    } else {
      res.status(401);
      throw "Manager authorization required !";
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const authenticateEmployee = async (req, res, next) => {
  try {
    const employeeRole = await Role.findOne({ role: "employee" });
    console.log("🚀 ~ employeeRole:", employeeRole);

    console.log("🚀 ~ req.isUser:", req.isUser);
    if (req.isUser && req.isUser.role.equals(employeeRole._id)) {
      next();
    } else {
      res.status(401);
      throw "Employee authorization required !";
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const authenticateCustomer = async (req, res, next) => {
  try {
    console.log(req.body);
    const isCustomer = await Customer.findOne({ email: req.body.email });
    console.log("🚀 ~ isCustomer:", isCustomer);
    if (!isCustomer) throw "Customer doesn't exist!";

    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};
module.exports = {
  authenticateUser,
  authenticateManager,
  authenticateEmployee,
  authenticateCustomer,
};
