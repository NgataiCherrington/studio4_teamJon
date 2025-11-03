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

router.get("/", jwtAuth, getWellness);
router.get("/:id", jwtAuth, getWellnessID);
router.put("/:id", jwtAuth, validatePutWellness, updateWellness);
router.delete("/:id", jwtAuth, deleteWellness, rbac("ADMIN"));

export default router;
