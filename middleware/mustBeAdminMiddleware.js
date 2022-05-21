const mustBeAdminMiddleware = async (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    next();
  } else {
    throw new Error("unauthorized");
  }
};

module.exports = mustBeAdminMiddleware;
