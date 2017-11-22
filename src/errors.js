function handle(err) {
  const message = err.message || 'Unknown error';
  const code = err.code || 1;
  console.log(message);

  process.exitCode = code;
  return false;
}

class UserNotFound extends Error {
  constructor() {
    super('User not found');
    this.code = 404;
  }
}

class UserAlreadyExists extends Error {
  constructor() {
    super('User already exists');
    this.code = 400;
  }
}

class InvalidUserToken extends Error {
  constructor() {
    super('User has a non-existant or invalid token');
    this.code = 500;
  }
}

module.exports = {
  handle,

  UserNotFound,
  InvalidUserToken,
  UserAlreadyExists
};
