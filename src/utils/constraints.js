import validate from 'validate.js';

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' }
  }
};

export const signUp = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' },
    length: {
      minimum: 8,
      message: 'password.length'
    }
  },
  passwordConfirmation: {
    presence: { message: 'passwordConfirmation.presence' },
    equality: {
      attribute: 'password',
      message: 'passwordConfirmation.equality'
    }
  },
  gender: {
    presence: { message: 'gender.presence' }
  },
  name: {
    presence: { message: 'name.presence' }
  }
};

export const createTarget = {
  radius: {
    presence: { message: 'radius.presence' }
  },
  title: {
    presence: { message: 'title.presence' }
  },
  topicId: {
    presence: { message: 'topic.presence' }
  }
};

validate.validators.presence.options = { allowEmpty: false };

export const validations = (constraints, props = {}) => data =>
  validate(data, constraints, props) || {};
