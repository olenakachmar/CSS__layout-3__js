/* eslint-disable max-len */
const formValidation = {
  init: () => {
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const button = document.getElementById('submitButton');

    const onlyLettersRegEx = /^[a-zA-Z]+$/;
    const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    const emailRegEx = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;

    const passwordMinLength = 4;
    const passwordMaxLengh = 100;

    const red = '#ff6d6d';

    let validName;
    let validPassword;
    let validEmail;

    // Validators
    name.onkeyup = function validateName() {
      validName = !(checkIfEmpty(name) || !checkIfOnlyLetters(name));
      showButton();
    };
    password.onkeyup = function validatePassword() {
      validPassword = !(
        checkIfEmpty(password)
        || !meetLength(password, passwordMinLength, passwordMaxLengh)
        || !containCharacters(password, passwordRegEx)
      );
      showButton();
    };
    email.onkeyup = function validateEmail() {
      validEmail = !(checkIfEmpty(email) || !containCharacters(email, emailRegEx));
      showButton();
    };

    // Show button
    const showButton = () => {
      (validName && validPassword && validEmail)
        ? button.classList.remove('disabled')
        : button.classList.add('disabled');
    };

    // Utility functions
    const checkIfEmpty = (field) => {
      if (isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} must not be empty`);
        return true;
      } else {
        setValid(field);
        return false;
      }
    };
    const isEmpty = (value) => {
      return value === '';
    };
    const setInvalid = (field, message) => {
      field.nextElementSibling.innerHTML = message;
      field.nextElementSibling.style.color = red;
    };

    function setValid(field) {
      field.nextElementSibling.innerHTML = '';
    }

    const checkIfOnlyLetters = (field) => {
      if (onlyLettersRegEx.test(field.value)) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
      }
    };
    const meetLength = (field, minLength, maxLength) => {
      if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
      } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
      } else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters long`);
        return false;
      }
    };
    const containCharacters = (field, regEx) => {
      switch (regEx) {
        case passwordRegEx:
          return matchWithRegEx(regEx, field, 'Must contain at least one uppercase, one lowercase letter and one number' +
            'and one special character');
        case emailRegEx:
          return matchWithRegEx(regEx, field, 'Must be a valid email address');
        default:
          return false;
      }
    };
    const matchWithRegEx = (regEx, field, message) => {
      if (field.value.match(regEx)) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, message);
        return false;
      }
    };
  },

};

export default formValidation;
