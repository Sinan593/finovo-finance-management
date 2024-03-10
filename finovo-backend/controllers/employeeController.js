const util = require("util");
const { StatusCodes } = require("http-status-codes");

const { BadRequestError, DatabaseError } = require("../errors");
const logger = require("../utils/logger");
const { connection } = require("../db/connectDB");

const asyncQuery = util.promisify(connection.query).bind(connection);

const getAllEmployee = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const employeeList = await asyncQuery(
      `SELECT * FROM employees where user_id = ?`,
      [id]
    );

    if (!employeeList) {
      throw new BadRequestError("NO employees available!");
    } else {
      res
        .status(StatusCodes.OK)
        .json({ success: true, data: { employees: employeeList } });
    }
  } catch (error) {
    next(error);
  }
};

const getSingleEmployee = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const employeeId = req.params.id;

    if (!employeeId) {
      throw new BadRequestError("Employee ID param required!");
    }

    const employee = await asyncQuery(
      `SELECT * FROM employees WHERE user_id = ? AND id = ?`,
      [id, employeeId]
    );

    if (!employee) {
      throw new BadRequestError("No such employee exists!");
    }

    res.status(StatusCodes.OK).json({ success: true, data: { employee } });
  } catch (error) {
    next(error);
  }
};

const addEmployee = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const { firstname, lastname, email, phone, job_title, salary } = req.body;

    if (!firstname || !lastname || !email || !phone || !job_title || !salary) {
      throw new BadRequestError("Missing/Invalid request body!");
    }

    const employee = await asyncQuery(
      `SELECT * FROM employees WHERE email = ? OR phone = ?`,
      [email, phone]
    );

    if (employee.length !== 0) {
      throw new BadRequestError(
        "Employee with same phone or email exists! Please try a different phone or email."
      );
    }

    const newEmployee = await asyncQuery(`INSERT INTO employees SET ?`, {
      user_id: id,
      firstname,
      lastname,
      email,
      phone,
      job_title,
      salary,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        employeeId: newEmployee.insertId,
        message: "Employee added succesfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

const editEmployee = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const employeeId = req.params.id;

    if (!employeeId) {
      throw new BadRequestError("Inavlid/Missing request param!");
    }

    const response = await asyncQuery(
      `DELETE FROM employees WHERE user_id = ? AND id = ?`,
      [id, employeeId]
    );

    if (response.affectedRows < 1) {
      throw new BadRequestError(
        "Failed to delete the employee. Please ensure that all required fields are provided and try again."
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        affectedRows: response.affectedRows,
        message: "Employee deleted successfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployee,
  getSingleEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
};
