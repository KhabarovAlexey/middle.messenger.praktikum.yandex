import Block from '../../core/Block';
import { validate } from '../../utils/validate';
import './login.css';

export class LoginPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
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

      onLogin: () => {
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement)
            .value,
        };
        
        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };
        console.log('action/login', loginData);

        nextState.errors.login = validate('login', loginData.login);
        nextState.errors.password = validate('password', loginData.password);

        this.setState(nextState);

        if (Object.values(nextState.errors).every((err) => !err)) {
          console.log('action/login', loginData);
        }
      },
    };
  }
  render() {
    const { errors, values } = this.state;
    
    return `
      <div class="login-page">
        <div class="login-page__content">
          <p class="login-page__title">Sign in</p>
          <from class="login-page__form">
            <div class="login-page__input">
              {{{Input
                value="${values.login}"
                label="Login"
                ref="login"
                type="text"
                id="login"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="loginError"
                ref="loginError"
                message="${errors.login}"
                className="login-page__input__error"
              }}}
            </div>
            <div class="login-page__input">
              {{{Input
                value="${values.password}"
                label="Password"
                ref="password"
                type="password"
                id="password"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              {{{InputError
                id="passwordError"
                ref="passwordError"
                message="${errors.password}"
                className="login-page__input__error"
              }}}
            </div>
            {{{Button text="Sign in" className="__button" onClick=onLogin}}}
            {{{Link text='Create account' link='/registration'}}}
          </from>
        </div>
      </div>`;
  }
}
