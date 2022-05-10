import Block from 'core/Block';
import { validate } from 'utils/validate';
import { connect } from 'utils/connect';
import authSevice from 'services/auth';
import './login.css';

class LoginPage extends Block {
  protected getStateFromProps() {
    this.state = {
      button: {
        type: 'submit',
        className: '__button',
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
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
    };
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    const login = this.refs.login.querySelector('input')!.value;
    const password = this.refs.password.querySelector('input')!.value;
    const loginData = {
      login,
      password,
    };

    Object.entries(loginData).forEach(([key, value]) => {
      this.setChildProps(`${key}Error`, {
        error: validate(key, value),
      });
    });
    console.log('login', loginData);

    await authSevice.login(loginData);
  }

  onFocus(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('focus', this);
    
    this.setChildProps(`${target.name}Error`, { error: '' });
  }

  onBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('blur', this);
    this.setChildProps(`${target.name}Error`, {
      error: validate(target.name, target.value),
    });
  }

  render() {
    return `
      <div class="login-page">
        <div class="login-page__content">
          <p class="login-page__title">Sign in</p>
          {{{Loader show=isLoading}}}
          <from class="login-page__form">
            <div class="login-page__input">
              {{{Input
                value=this.values.login
                label="Login"
                ref="login"
                type="text"
                id="login"
                events=input.events
              }}}
              {{{InputError
                id="loginError"
                ref="loginError"
                message=this.errors.login
                className="login-page__input__error"
              }}}
            </div>
            <div class="login-page__input">
              {{{Input
                value=this.values.password
                label="Password"
                ref="password"
                type="password"
                id="password"
                events=input.events
              }}}
              {{{InputError
                id="passwordError"
                ref="passwordError"
                message=this.errors.password
                className="login-page__input__error"
              }}}
            </div>
            {{{Button text="Sign in" type=button.type className=button.className events=button.events}}}
            {{{Link text='Create account' link='/sign-up'}}}
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

export default connect(mapStateToProps)(LoginPage);
