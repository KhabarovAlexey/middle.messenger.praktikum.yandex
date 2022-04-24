import Block from 'core/Block';
import { validate } from 'utils/validate';
import './profile.css';

export class ProfilePage extends Block {
  protected getStateFromProps() {
    this.state = {
      userName: 'Petrov Petr',
      userAvatar: '../static/Ellipse 3.png',
      fields: [
        {
          ref: 'email',
          refError: 'emailError',
          id: 'field__email',
          label: 'Email',
          name: 'email',
          type: 'email',
          value: 'pochta@yandex.ru',
          readonly: true,
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'login',
          refError: 'loginError',
          id: 'field__login',
          label: 'Login',
          name: 'login',
          type: 'text',
          value: 'petrovpetr',
          readonly: true,
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'first_name',
          refError: 'first_nameError',
          id: 'field__first-name',
          label: 'First name',
          name: 'first_name',
          type: 'text',
          value: 'Petr',
          readonly: true,
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'second_name',
          refError: 'second_nameError',
          id: 'field__second-name',
          label: 'Second name',
          name: 'second_name',
          type: 'text',
          value: 'Petrov',
          readonly: true,
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'phone',
          refError: 'phoneError',
          id: 'field__phone',
          label: 'Phone',
          name: 'phone',
          type: 'tel',
          value: '8-800-888-88-88',
          readonly: true,
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
      ],
      password: [
        {
          ref: 'old_password',
          refError: 'old_passwordError',
          id: 'field__old-pass',
          label: 'Old password',
          name: 'old_password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'password',
          refError: 'passwordError',
          id: 'field__new-pass',
          label: 'New password',
          name: 'password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
        {
          ref: 'confirm_password',
          refError: 'confirm_passwordError',
          id: 'field__confirm_password',
          label: 'Confirm password',
          name: 'confirm_password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.onFocusHandler.bind(this),
            focusout: this.onBlurHandler.bind(this),
          },
        },
      ],
      button: {
        text: 'Back',
        events: {
          click: this.saveDataHandler.bind(this),
        },
      },
      links: [
        {
          link: '#',
          textLink: 'Change data',
          events: {
            click: this.changeInfoHandler.bind(this),
          },
        },
        {
          link: '#',
          textLink: 'Change password',
          events: {
            click: this.changePasswordHandler.bind(this),
          },
        },
      ],
    };
  }

  toggleDataHandler() {
    const links = document.querySelector('.profile__links');
    const button = document.querySelector('.profile__button');
    links?.classList.toggle('profile__links_hidden');
    button?.classList.toggle('profile__button_hidden');
  }

  changeInfoHandler(event: Event) {
    event.preventDefault();
    const { fields } = this.state;
    const newFields = fields.map((field: TStringObject) => ({
      ...field,
      readonly: false,
    }));
    this.setState({
      ...this.state,
      fields: newFields,
    });

    this.toggleDataHandler();
  }

  changePasswordHandler(event: Event) {
    event.preventDefault();
    this.changeInfoHandler(event);
    const profileData = document.querySelector('.profile__change-data');
    const profilePass = document.querySelector('.profile__change-pass');
    profileData?.classList.toggle('profile__change-data_hidden');
    profilePass?.classList.toggle('profile__change-pass_hidden');
  }

  saveDataHandler(event: Event) {
    event.preventDefault();
    const profileData = document.querySelector('.profile__change-data');
    const condition = profileData?.classList.contains('profile__change-data_hidden');
    if (!condition) {
      const login = this.refs.login.querySelector('input')!.value;
      const email = this.refs.email.querySelector('input')!.value;
      const first_name = this.refs.first_name.querySelector('input')!.value;
      const second_name = this.refs.second_name.querySelector('input')!.value;
      const phone = this.refs.phone.querySelector('input')!.value;
      const loginData = {
        login,
        email,
        first_name,
        second_name,
        phone,
      };
      Object.entries(loginData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        this.setChildProps(`${key}Error`, {
          error: validate(key, value),
        });
      });
    } else {
      const old_password = this.refs.old_password.querySelector('input')!.value;
      const password = this.refs.password.querySelector('input')!.value;
      const re_password = this.refs.re_password.querySelector('input')!.value;
      const passData = {
        old_password,
        password,
        re_password,
      };
      Object.entries(passData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        this.setChildProps(`${key}Error`, {
          error: validate(key, value),
        });
      });
    }
  }

  onFocusHandler(event: Event) {
    const target = event.target! as HTMLInputElement;
    this.setChildProps(`${target.name}Error`, { message: '' });
  }

  onBlurHandler(event: Event) {
    const target = event.target! as HTMLInputElement;
    this.setChildProps(`${target.name}Error`, {
      message: validate(target.name, target.value),
    });
  }

  protected render() {
    return `
    <div class="profile-page">
      <div class="profile-page__user-avatar">
        <div class="profile-page__avatar">
          <img src="{{userImage}}">
        </div>
        <p class="profile-page__username">{{userName}}</p>
      </div>
      <form class="profile-page__inf">
        <div>
        {{#each fields}}
          <div class="profile-page__data-field">
            <label for='{{id}}' class='field__label'>{{label}}</label>
            <div class="field__input-container">
              <input
                id='{{id}}'
                type='{{type}}'
                class='field__input'
                value='{{value}}'
                name='{{name}}'
                {{#if readonly}}readonly{{/if}}
              />
            </div>
          </div>   
        {{/each}}   
        </div> 
      </from>
      <div class="profile__links">
        {{#each links}}
          <div class="profile__link">
              {{{Link text=this.textLink link=this.link events=this.events}}}
          </div>
        {{/each}}
      </div>
      {{{Link text='Back to chat' link='/chat'}}}
    </div>`;
  }
}
