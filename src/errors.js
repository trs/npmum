function handleError(err) {
  const message = err.message || 'Unknown error';
  const code = err.code || 1;
  console.error(message);

  process.exitCode = code;
  return false;
}

class UserNotFound extends Error {
  constructor(name) {
    super(`User not found: ${name}`);
    this.code = 404;
  }
}

class UserAlreadyExists extends Error {
  constructor(name) {
    super(`User already exists: ${name}`);
    this.code = 400;
  }
}

class InvalidUserToken extends Error {
  constructor() {
    super('User has an invalid token');
    this.code = 500;
  }
}

module.exports = {
  handleError,

  UserNotFound,
  InvalidUserToken,
  UserAlreadyExists
};
