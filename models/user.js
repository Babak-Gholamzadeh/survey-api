const { v4: uuidv4 } = require('uuid');

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const User = ({email, password}) => {
  if(!email)
    throw new Error('email is required!');
  if(!validateEmail(email))
    throw new Error('email is invalid!');
  if(!password)
    throw new Error('password is required!');
  if(password.length < 3 || password.length > 20)
    throw new Error('password length must be between 3 and 20');
  const _id = uuidv4();
  const user = {
    _id,
    email,
    password,
  };
  return user;
};

module.exports = User;
