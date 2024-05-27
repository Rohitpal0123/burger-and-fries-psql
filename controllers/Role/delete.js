const Role = require("../../models/role.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class deleteRole {
  async roleExists(id) {
    try {
      const roleExists = await Role.findOne({ _id: id });
      if (!roleExists) throw new Error("Role does not exists !");

      return roleExists;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.roleExists(id);

    const deletedRole = await Role.deleteOne({ _id: id });
    if (!deletedRole) throw new apiError(500, "Role not deleted !");

    res.status(400).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: deletedRole,
    });
  });
}

module.exports = new deleteRole();
