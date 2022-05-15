import Block from 'core/Block';
import { connect } from 'utils/connect';
import { validate } from 'utils/validate';
import { router } from '../../router';
import authService from 'services/auth';
import userService from 'services/users';
import store from 'core/Store';
import './profile.css';

class ProfilePage extends Block {
  protected getStateFromProps() {
    this.state = {
      userName: 'Petrov Petr',
      choose: {
        change: this.changeFile.bind(this),
      },
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
          },
        },
      ],
      passwords: [
        {
          ref: 'old_password',
          refError: 'old_passwordError',
          id: 'field__old-pass',
          label: 'Old password',
          name: 'old_password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
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
            focusin: this.onFocus.bind(this),
            focusout: this.onBlur.bind(this),
          },
        },
      ],
      buttons: [
        {
          text: 'Save',
          className: 'profile-page__save-button hidden',
          events: {
            click: this.saveInfo.bind(this),
          },
        },
        {
          text: 'Back',
          className: 'profile-page__back-button',
          events: {
            click: this.backToChats.bind(this),
          },
        },
      ],
      links: [
        {
          link: '#',
          text: 'Change data',
          events: {
            click: this.changeInfo.bind(this),
          },
        },
        {
          link: '#',
          text: 'Change password',
          events: {
            click: this.changePassword.bind(this),
          },
        },
      ],
    };
  }

  async componentDidMount() {
    const user: Indexed = await authService.getUser();
    const { fields } = this.state;
    const newFields = fields.map((field: Indexed) => {
      const newValue = user[field.name];
      const newField = { ...field, value: newValue };
      return newField;
    });
    this.setState({
      ...this.state,
      fields: newFields,
      user,
    });
  }

  async changeFile(event: Event) {
    const { files }: { files: FileList | null } = event.target as HTMLInputElement;
    if (!files?.length) {
      return;
    }
    const [file] = files;
    const formData = new FormData();
    formData.append('avatar', file);
    await userService
      .changeUserAvatar(formData)
      .then((data) => {
        store.set({
          user: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeInfo(event: Event) {
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

    const links = document.querySelector('.profile-page__links');
    const buttonBack = document.querySelector('.profile-page__back-button');
    const buttonSave = document.querySelector('.profile-page__save-button');
    links?.classList.toggle('profile-page__links_hidden');
    buttonBack?.classList.toggle('hidden');
    buttonSave?.classList.toggle('hidden');
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.changeInfo(event);
    const profileData = document.querySelector('.profile-page__change-data');
    const profilePass = document.querySelector('.profile-page__change-pass');
    profileData?.classList.toggle('hidden');
    profilePass?.classList.toggle('hidden');
  }

  saveInfo(event: Event) {
    event.preventDefault();
    const profileData = document.querySelector('.profile-page__change-data');
    const condition = profileData?.classList.contains('profile-page__change-data_hidden');
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

  backToChats(event: Event) {
    event.preventDefault();
    router.go('/messenger');
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

  protected render() {
    return `
    <div class="profile-page">
      {{{Loader show=isLoading}}}
      <div class="profile-page__user-avatar">
        {{{Avatar events=choose img=user.avatar}}}
        <p class="profile-page__username">{{userName}}</p>
      </div>
      <form class="profile-page__inf">
        <div class="profile-page__change-data">
          {{#each fields}}
            <div class="profile-page__data-field">
              <label for='{{id}}' class='field__label'>{{label}}</label>
              <div class="field__input-container">
                <input
                  id={{this.id}}
                  type={{this.type}}
                  class='field__input'
                  value={{this.value}}
                  name={{this.name}}
                  {{#if readonly}}readonly{{/if}}
                />
              </div>
            </div>  
            {{{InputError ref=this.refError className='input-error_profile'}}} 
          {{/each}}   
        </div> 
        <div class="profile-page__change-pass hidden">
          {{#each passwords}}
            <div class="profile-page__pass-field">
              <label for='{{id}}' class='field__label'>{{label}}</label>
              <div class="field__input-container">
                <input
                  id={{this.id}}
                  type={{this.type}}
                  class='field__input'
                  value={{this.value}}
                  name={{this.name}}
                  {{#if readonly}}readonly{{/if}}
                />
              </div>
            </div>   
            {{{InputError ref=this.refError className='input-error_profile'}}}
          {{/each}}
        </div>
      </form>
      <div class="profile-page__links">
        {{#each links}}
          <div class="profile__link">
            {{{Link text=this.text link=this.link events=this.events}}}
          </div>
        {{/each}}
      </div>    
      <div class="profile-page__buttons">
        {{#each buttons}}
          {{{Button text=this.text className=this.className events=this.events}}}
        {{/each}}
      </div>
    </div>`;
  }
}

const mapStateToProps = (state: Indexed) => ({
  error: state.error,
  user: state.user,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(ProfilePage);
