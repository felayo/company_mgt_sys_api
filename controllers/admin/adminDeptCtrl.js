const Department = require('../../models/department/departmentModel');
const DepartmentRecords = require("../../models/department/departmentRecordModel");
const Staff = require("../../models/staff/staffModel");
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

exports.assignStaffToDepartment = asyncHandler(async (req, res, next) => {

  const userId = req.params.userId;
  const deptId = req.params.deptId;

  let staff = await Staff.findOne({ _id: userId });
  if (!staff) {
    return next(new ErrorResponse("The staff account does not exist", 404));
  }

  let depts = await Department.findOne({ _id: deptId });
  if (!depts) {
    return next(new ErrorResponse("The department is not found", 404));
  }

  let department = await DepartmentRecords.findOne({ staff: userId });

  if (department) {
    return next(
      new ErrorResponse("This staff is already in the department", 422)
    );
  }

  // let staffID = req.body.staffID;

  // department = await DepartmentRecords.findOne({ staffID });

  // if (department) {
  //   return next(new ErrorResponse("The staff id is already taken", 422));
  // }

  req.body.staff = userId;
  req.body.department = deptId;
  // req.body.name = depts.name;
  // req.body.staffName = staff.name;

  department = await DepartmentRecords.create(req.body);

  res.status(201).json({
    success: true,
    data: department,
  });
});


exports.getAllStaffInDepartments = asyncHandler(async (req, res, next) => {
  const department = await DepartmentRecords.find().populate({
    path: "department",
    select: "name",
    model: "Department",
  }).populate({
    path: "staff",
    select: "name staffId",
    model: "Staff"
  });

  if (department.length < 1) return next(new ErrorResponse("No record yet!", 404));
  
  res.status(200).json({
    success: true,
    message: "fetched all staff by departments successfully",
    data: department,
  });
});
