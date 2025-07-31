export class UsernameAlreadyExistsException extends Error {
  constructor(username: string) {
    super(`Username ${username} already exists.`);
    this.name = 'UsernameAlreadyExistsException';
  }
}

export class EmailAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`Email${email} already exists.`);
    this.name = 'EmailAlreadyExistsException';
  }
}

export class InvalidLoginException extends Error {
  constructor() {
    super('Invalid login');
    this.name = 'InvalidLoginException';
  }
}

export class NotFoundException extends Error {
  constructor() {
    super(`Not found`);
    this.name = 'NotFoundException';
  }
}
