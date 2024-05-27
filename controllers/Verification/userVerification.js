const UserVerification = require("../../models/userVerification.model");
const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const generateOtp = require("../../lib/generateOtp");
const sendOtp = require("../../lib/generateMail");
const validate = require("../../lib/validate");
const signupUserSchema = require("../../jsonSchema/User/signup");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class userVerification {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists != null) throw new apiError(400, "User already exists !");
    } catch (error) {
      throw error;
    }
  }

  async roleExists(role) {
    try {
      const roleExists = await Role.findOne({ _id: role });
      if (!roleExists) throw new apiError(400, "Role does not exists !");

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    validate(req.body, signupUserSchema);
    const { firstName, lastName, userName, email, password, role } = req.body;

    await this.userExists(email);
    await this.roleExists(role);

    const otp = await generateOtp();

    const mailDetails = {
      from: "service@b&f.com",
      to: email,
      subject: "OTP Verification",
      text: `Your b&f signup OTP is ${otp}`,
    };

    const userOtp = await sendOtp(mailDetails);
    if (!userOtp) throw new apiError(500, "Otp not sent!");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userVerification = await UserVerification.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: hashedPassword,
      role: role,
      isVerified: false,
      otp: otp,
    });
    if (!userVerification) throw new apiError(400, "User not signedup !");
    res.status(200).json(`OTP sent to ${email}`);
  });
}

module.exports = new userVerification();
