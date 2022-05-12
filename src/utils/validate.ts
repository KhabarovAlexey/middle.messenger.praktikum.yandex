interface Validation {
  [key: string]: (v: string) => string;
}

type ValidationChain = Array<{ check: (v: string) => boolean; message: string }>;

const rules: { [key: string]: (v: string) => boolean } = {
  isNull: (v) => !v,
  isLessThan4Chars: (v) => v.length < 4,
  isLessThan8Chars: (v) => v.length < 8,
  isMoreThan20Chars: (v) => v.length > 20,
  isMoreThan40Chars: (v) => v.length > 40,
  isDigitsOnly: (v) => v.search(/^\d+$/) !== -1,
  isProhibitedLoginSymbols: (v) => v.search(/^[a-z0-9\-\_]+$/gi) !== 0,
  isProhibitedNameSymbols: (v) => v.search(/^[A-Z\u0410-\u042f][\u0430-\u044fa-z0-9\-]+$/gi) !== 0,
  isInvalidEmail: (v) =>
    v.search(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== 0,
  isInvalidPhone: (v) => v.search(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) !== 0,
  isFirstCapital: (v) => v.search(/^[A-Z\u0410-\u042f]/) !== 0,
  isAtLeastOneCapitalLetter: (v) => v.search(/[A-Z]/) === -1,
  isAtLeastOneDigit: (v) => v.search(/\d/) === -1,
};

function nameValidationChain(name: string): ValidationChain {
  return [
    { check: rules.isNull, message: `${name} is required` },
    { check: rules.isProhibitedNameSymbols, message: `Allowed ${name} symbols: Latin/Cyrillic letters and dash (-)` },
    { check: rules.isFirstCapital, message: `First letter should be Capital` },
    { check: rules.isEqual, message: `Passwords not equal` },
  ];
}

const validation: Validation = {
  login: (login: string) => {
    const validationChain: ValidationChain = [
      { check: rules.isNull, message: 'Login is required' },
      { check: rules.isLessThan4Chars, message: 'Login length should be between 3 and 20 chars' },
      { check: rules.isMoreThan20Chars, message: 'Login length should be between 3 and 20 chars' },
      { check: rules.isDigitsOnly, message: 'Login should not consist of digits only' },
      {
        check: rules.isProhibitedLoginSymbols,
        message: 'Allowed Login symbols: Latin letters, dash (-) and underline (_)',
      },
    ];

    return validationChain.find((link) => link.check(login))?.message || '';
  },
  password: (password: string) => {
    const validationChain: ValidationChain = [
      { check: rules.isNull, message: 'Password is required' },
      { check: rules.isLessThan8Chars, message: 'Password length should be between 8 and 40 chars' },
      { check: rules.isMoreThan40Chars, message: 'Password length should be between 8 and 40 chars' },
      { check: rules.isAtLeastOneCapitalLetter, message: 'Password should contain at least one capital letter' },
      { check: rules.isAtLeastOneDigit, message: 'Password should contain at least one digit' },
    ];

    return validationChain.find((link) => link.check(password))?.message || '';
  },
  first_name: (firstName: string) => {
    return nameValidationChain('First Name').find((link) => link.check(firstName))?.message || '';
  },
  second_name: (secondName: string) => {
    return nameValidationChain('Second Name').find((link) => link.check(secondName))?.message || '';
  },
  email: (email: string) => {
    const validationChain: ValidationChain = [
      { check: rules.isNull, message: 'Email is required' },
      { check: rules.isInvalidEmail, message: 'Invalid Email' },
    ];

    return validationChain.find((link) => link.check(email))?.message || '';
  },
  phone: (phone: string) => {
    const validationChain: ValidationChain = [
      { check: rules.isNull, message: 'Phone is required' },
      { check: rules.isInvalidPhone, message: 'Invalid Phone' },
    ];

    return validationChain.find((link) => link.check(phone))?.message || '';
  },
  confirmPassword: (confirmPassword: string) => {
    const passValue = document.querySelector<HTMLInputElement>('[name="password"]')?.value;
    if (passValue !== confirmPassword || !confirmPassword) {
      return nameValidationChain('Confirm password').find((link) => link.check(confirmPassword))?.message || '';
    }
    return '';
  },
};

export function validate(key: string, value: string) {
  return validation[key](value);
}

export function isValid(data: TStringObject) {
  return Object.entries(data).every(([key, value]) => !validate(key, value as string));
}
