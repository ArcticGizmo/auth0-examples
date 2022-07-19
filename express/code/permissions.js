const { UnauthorizedError } = require('express-oauth2-jwt-bearer');

// Generate a response header per https://tools.ietf.org/html/rfc6750#section-3
const getHeaders = (error, description, permissions) => ({
  'WWW-Authenticate': `Bearer realm="api", error="${error}", error_description="${description.replace(
    /"/g,
    "'",
  )}"${(permissions && `, permission="${permissions.join(' ')}"`) || ''}`,
});

class InsufficientPermissionsError extends UnauthorizedError {
  code = 'Insufficient_permissions';
  status = 403;
  statusCode = 403;

  constructor(permissions, message = 'Insufficient Permission') {
    super(message);
    this.headers = getHeaders(this.code, this.message, permissions);
  }
}

function requiredPermissions(permissions) {
  if (typeof permissions === 'string') {
    permissions = permissions.split(' ');
  }

  if (!Array.isArray(permissions)) {
    throw new TypeError("'permissions' must be a string or array of string");
  }

  // If no permissions given, do nothing
  if (permissions.length === 0) {
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    const hasPermission = arePermissionsGiven(req, permissions);

    if (!hasPermission) {
      throw new InsufficientPermissionsError(permissions);
    }

    next();
  };
}

function arePermissionsGiven(req, expected) {
  try {
    const actual = req.auth.payload.permissions || [];
    return expected.every(p => actual.includes(p));
  } catch {
    throw new UnauthorizedError();
  }
}

module.exports = {
  requiredPermissions,
};
