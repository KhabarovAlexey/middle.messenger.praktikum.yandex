import Block from '../../core/Block';
import { validate } from '../../utils/validate';
import './registration.css';

export class RegistrationPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      onFocus: (event: Event) => {
        const target = event.target! as HTMLInputElement;
        this.setChildProps(`${target.name}Error`, { message: '' });
      },

      onBlur: (event: Event) => {
        const target = event.target! as HTMLInputElement;
        this.setChildProps(`${target.name}Error`, {
          message: validate(target.name, target.value),
        });
      },

      onSubmit: () => {
        const signUpData = {
          email: (this.refs.email.firstElementChild as HTMLInputElement).value,
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          firstName: (this.refs.firstName.firstElementChild as HTMLInputElement).value,
          secondName: (this.refs.secondName.firstElementChild as HTMLInputElement).value,
          phone: (this.refs.phone.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value,
          confirmPassword: (this.refs.confirmPassword.firstElementChild as HTMLInputElement).value,
        };

        const nextState = {
          errors: {
            email: '',
            login: '',
            firstName: '',
            secondName: '',
            phone: '',
            password: '',
            confirmPassword: '',
          },
          values: { ...signUpData },
        };
        console.log('action/registration', signUpData);

        nextState.errors.email = validate('email', signUpData.email);
        nextState.errors.login = validate('login', signUpData.login);
        nextState.errors.firstName = validate('firstName', signUpData.firstName);
        nextState.errors.secondName = validate('secondName', signUpData.secondName);
        nextState.errors.phone = validate('phone', signUpData.phone);
        nextState.errors.password = validate('password', signUpData.password);
        nextState.errors.confirmPassword = validate('confirmPassword', signUpData.confirmPassword);

        this.setState(nextState);

        if (Object.values(nextState.errors).every((err) => !err)) {
          console.log('action/registration', signUpData);
        }
      },
    };
  }
  render() {
    const { errors, values } = this.state;
    return `
      <div class="registration-page">
        <div class="registration-page__content">
          <p class="registration-page__title">Create account</p>
          <from class="registration-page__form">
            <div class="registration-page__input">
              {{{Input
                value="${values.email}"
                ref="email"
                type="email"
                label="Email"
                id="email"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="emailError"
                ref="emailError"
                message="${errors.email}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.login}"
                ref="login"
                type="text"
                label="Login"
                id="login"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="loginError"
                ref="loginError"
                message="${errors.login}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.firstName}"
                ref="firstName"
                type="text"
                label="First name"
                id="firstName"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="firstNameError"
                ref="firstNameError"
                message="${errors.firstName}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.secondName}"
                ref="secondName"
                type="text"
                label="Second name"
                id="secondName"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="secondNameError"
                ref="secondNameError"
                message="${errors.secondName}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.phone}"
                ref="phone"
                type="phone"
                label="Phone"
                id="phone"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="phoneError"
                ref="phoneError"
                message="${errors.phone}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.password}"
                ref="password"
                type="password"
                label="Password"
                id="password"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="passwordError"
                ref="passwordError"
                message="${errors.password}"
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value="${values.confirmPassword}"
                ref="confirmPassword"
                type="password"
                label="Confirm password"
                id="confirmPassword"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="confirmPasswordError"
                ref="confirmPasswordError"
                message="${errors.confirmPassword}"
                className="registration-page__input__error"
              }}}
            </div>
            {{{Button text="Create account" className="__button" onClick=onSubmit}}}
            {{{Link text='Sign in' link='/login'}}}
          </from>
        </div>
      </div>`;
  }
}
