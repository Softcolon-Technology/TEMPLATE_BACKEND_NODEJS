import config from "../config/index.js";
import { UserModel } from "../model/admin.js";
import constant from "../utilities/constant.js";
import logger from "../utilities/logger.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendBadRequest, sendSuccess } from "../utilities/response/index.js";
import { generateAccessToken } from "../helper/accessTokenHelper.js";
import { generateRefreshToken } from "../helper/refreshTokenHelper.js";
import messages from "../utilities/messages.js";

//Token
export const tokenId = () => {
    return crypto.randomBytes(16).toString('hex')
  }

// user login
export const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({ ID: data.ID });
    if (!user) return sendBadRequest(res, messages.adminNotFound);
    if (!bcrypt.compareSync(data.password, user.password))
      return sendBadRequest(res, messages.invalidPassword);
    // if (admin.status === 'INACTIVE') return sendBadRequest(res, messages.accountDeactivated)

    const accessTokenId = tokenId();
    const refreshTokenId = tokenId();
    const accessToken = await generateAccessToken(
      { _id: user._id, accessTokenId },
      user.role
    );

    const refreshToken = await generateRefreshToken(
      { _id: user._id, refreshTokenId },
      user.role
    );
    user.accessTokenId = accessTokenId;
    user.refreshTokenId = refreshTokenId;
    await user.save();
    return sendSuccess(
      res,
      { id: user.id, accessToken, refreshToken, role: user.role },
      messages.adminLoggedIn
    );
  } catch (e) {
    logger.error("ADMSTR_LOGIN");
    logger.error(e);
    return sendBadRequest(res, errorHelper(e, "LOGIN"));
  }
};
export const createMainAdmin = async () => {
  try {
    const adminDetails = await UserModel.findOne({
      Domain: config.ROOT_ADMINS_DOMAINS,
    });
    if (adminDetails) return;
    const admin = await UserModel.findOne({ ID: config.ADMIN_ID });
    if (!admin) {
      const adminData = {
        firstName: "Super",
        lastName: "Admin",
        ID: config.ADMIN_ID,
        password: bcrypt.hashSync(config.ADMIN_PASSWORD, 10),
        role: constant.ROLE[0],
        Domain: config.ROOT_ADMINS_DOMAINS,
      };
      const admin = await new UserModel(adminData).save();
    }
  } catch (e) {
    logger.error("CREATE_MAIN_ADMIN");
    logger.error(e);
  }
};
