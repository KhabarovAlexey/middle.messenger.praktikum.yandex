import Block from 'core/Block';
import { validate } from 'utils/validate';
import { connect } from 'utils/connect';
import authService from 'services/auth';
import './registration.css';

class RegistrationPage extends Block {
  protected getStateFromProps() {
    this.state = {
      button: {
        type: 'submit',
        className: 'registration-page__button',
        events: {
          click: this.onSubmit.bind(this),
        },
      },
      input: {
        events: {
          focusout: this.onFocus.bind(this),
          focusin: this.onBlur.bind(this),
        },
      },
      values: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
    };
  }
  onFocus(event: Event) {
    const target = event.target as HTMLInputElement;
    this.setChildProps(`${target.name}Error`, { error: '' });
  }

  onBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    this.setChildProps(`${target.name}Error`, {
      error: validate(target.name, target.value),
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const email = this.refs.email.querySelector('input')!.value;
    const login = this.refs.login.querySelector('input')!.value;
    const first_name = this.refs.first_name.querySelector('input')!.value;
    const second_name = this.refs.second_name.querySelector('input')!.value;
    const phone = this.refs.phone.querySelector('input')!.value;
    const password = this.refs.password.querySelector('input')!.value;
    const confirmPassword = this.refs.confirmPassword.querySelector('input')!.value;
    const signUpData = {
      email,
      login,
      first_name,
      second_name,
      phone,
      password,
      confirmPassword,
    };

    Object.entries(signUpData).forEach(([key, value]) => {
      this.setChildProps(`${key}Error`, {
        error: validate(key, value),
      });
    });

    await authService.signup(signUpData);
  }

  render() {
    return `
      <div class="registration-page">
        <div class="registration-page__content">
          <p class="registration-page__title">Create account</p>
          {{{Loader show=isLoading}}}
          <from class="registration-page__form">
            <div class="registration-page__input">
              {{{Input
                value=values.email
                label="Email"
                ref="email"
                type="email"
                id="email"
                events=input.events
              }}}
              {{{InputError
                id="emailError"
                ref="emailError"
                message=errors.email
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value=values.login
                label="Login"
                ref="login"
                type="text"
                id="login"
                events=input.events
              }}}
              {{{InputError
                id="loginError"
                ref="loginError"
                message=errors.login
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value=values.first_name
                label="First name"
                ref="firstName"
                type="text"
                id="firstName"
                events=input.events
              }}}
              {{{InputError
                id="firstNameError"
                ref="firstNameError"
                message=errors.first_name
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value=values.second_name
                label="Second name"
                ref="secondName"
                type="text"
                id="secondName"
                events=input.events
              }}}
              {{{InputError
                id="secondNameError"
                ref="secondNameError"
                message=errors.second_name
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value=values.phone
                label="Phone"
                ref="phone"
                type="phone"
                id="phone"
                events=input.events
              }}}
              {{{InputError
                id="phoneError"
                ref="phoneError"
                message=errors.phone
                className="registration-page__input__error"
              }}}
            </div>
            <div class="registration-page__input">
            {{{Input
              value=values.password
              label="Password"
              ref="password"
              type="password"
              id="password"
              events=input.events
            }}}
            {{{InputError
              id="passwordError"
              ref="passwordError"
              message=errors.password
              className="registration-page__input__error"
            }}}
            </div>
            <div class="registration-page__input">
              {{{Input
                value=values.confirmPassword
                label="Confirm password"
                ref="confirmPassword"
                type="password"
                id="confirmPassword"
                events=input.events
              }}}
              {{{InputError
                id="confirmPasswordError"
                ref="confirmPasswordError"
                message=errors.confirmPassword
                className="registration-page__input__error"
              }}}
            </div>
            {{{Button text="Create account" type=button.type className=button.className events=button.events}}}
            {{{Link text='Sign in' link='/'}}}
          </from>
        </div>
      </div>`;
  }
}

const mapStateToProps = (state: Indexed) => ({
  error: state.error,
  user: state.user,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(RegistrationPage);
