import Block from '../../core/Block';

import './contact.css';

interface ContactProps {
  name?: string;
  message?: string;
  time?: string;
  notification?: number;
  onClick?: () => void;
}

export class Contact extends Block {
  constructor({ name, message, time, notification, onClick }: ContactProps) {
    super({ name, message, time, notification, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
    <div class="contact">
      <div class="contact__avatar">
      </div>
      <div class="contact__info">
        <p class="contact__name">
          {{name}}
        </p>
        <p class="contact__message">
          {{message}}
        </p>
      </div>
      <div class="contact__active">
        <div class="contact__time">
          {{time}}
        </div>
        <div class="contact__notification">
          {{#if notification}}
            <div class="contact__notification-circle">{{notification}}</div>
          {{/if}}
        </div>
      </div>
    </div>`;
  }
}
