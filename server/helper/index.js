const role_student = require('./constants').role_student;
const role_admin = require('./constants').role_admin;
const role_instructor = require('./constants').role_instructor;
const role_hiringpartner = require('./constants').role_hiringpartner;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    id: request.id,
    firstname: request.firstname,
    lastname: request.lastname,
    email: request.email,
    role: request.role,
    id_user: request.id_user
  };

  return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
  let role;

  switch (checkRole) {
    case role_hiringpartner: role = 4; break;
    case role_instructor: role = 3; break;
    case role_admin: role = 2; break;
    case role_student: role = 1; break;
    default: role = 1;
  }

  return role;
};
