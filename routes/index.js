import express from "express";
import healthRoute from "./health/index.js";
import exchangeRoute from "./exchangeRoute.js"
import symbolRoute from "./symbolRoute.js"
import adminRoute from "./adminRoute.js"

const router = express.Router();

/* GET home page. */

//like router use like this
router.use("/health", healthRoute);
router.use("/exchange", exchangeRoute);
router.use("/symbol", symbolRoute);
router.use("/auth", adminRoute)

export default router;
