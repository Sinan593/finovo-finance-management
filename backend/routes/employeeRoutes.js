const express = require("express");
const {
  getAllEmployee,
  getSingleEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const router = express.Router();

router
  .route("/")
  .get(verifyJwtToken, getAllEmployee)
  .post(verifyJwtToken, addEmployee);
router
  .route(`/:id`)
  .get(verifyJwtToken, getSingleEmployee)
  .delete(verifyJwtToken, deleteEmployee)
  .patch(verifyJwtToken, editEmployee);

module.exports = router;
