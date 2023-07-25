const Department = require('../../models/department/departmentModel');
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../../utils/errorResponse");


exports.createDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.create(req.body);

    res.status(201).json({
        success: true,
        data: department
    })
})

exports.getDepartments = asyncHandler(async (req, res, next) => {
    const department = await Department.find();

    res.status(200).json({
        success: true,
        message: "fetched all deparment names",
        data: department
    })
})