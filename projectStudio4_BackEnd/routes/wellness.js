import express from "express";

import {
  createWellness,
  getWellness,
  getWellnessID,
  updateWellness,
  deleteWellness,
} from "../controllers/wellness.js";

import {
  validatePostWellness,
  validatePutWellness,
} from "../middleware/validation/wellness.js";

import jwtAuth from "../middleware/jwtauth.js";
import rbac from "../middleware/rbac.js";

const router = express.Router();

router.post(
    "/", 
    validatePostWellness, 
    jwtAuth, 
    createWellness
);

router.get("/", getWellness);
router.get("/:id", getWellnessID);
router.put("/:id", validatePutWellness, updateWellness);
router.delete("/:id", deleteWellness, rbac("ADMIN"));

export default router;
