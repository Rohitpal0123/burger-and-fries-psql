const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const generateToken = require("../User/generateToken");
const createDBLog = require("../../lib/createDBLog");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class signup {
  async roleExists(role) {
    const roleExists = await Role.findById(role);
    if (!roleExists) throw new apiError(400, "Role doesn't exist !");
    return null;
  }

  async emailExists(email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) throw new apiError(400, "Email already exists !");
    return null;
  }

  process = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, userName, email, password, role } =
      req.body;

    await this.emailExists(email);
    await this.roleExists(role);

    const newUser = await User.create({
      _id,
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
    });

    //Log User to accessLog DB collection
    const dbLogger = await createDBLog();
    dbLogger.info(`Sign up attempt by ${newUser.role} - ${newUser.userName}!`);

    const token = generateToken(newUser._id, newUser.role);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("jwt", token, options)
      .json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      });
  });
}

module.exports = new signup();
