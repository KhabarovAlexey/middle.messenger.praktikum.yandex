import { Block } from '../../core';
import './errors.css';

export class Error404 extends Block {
  protected getStateFromProps() {
    this.state = {
      code: 404,
      description: 'Not Found',
    };
  }
  protected render() {
    return `
    <div class="error">
      <p class="error__code">{{code}}</p>
      <p class="error__description">{{description}}</p>
      {{{Link text='Back to chats' link='/chat'}}}
    </div>
  `;
  }
}

export class Error500 extends Block {
  protected getStateFromProps() {
    this.state = {
      code: 500,
      description: 'Internal Server Error',
    };
  }
  protected render() {
    return `
    <div class="error">
      <p class="error__code">{{code}}</p>
      <p class="error__description">{{description}}</p>
      {{{Link text='Back to chats' link='/chat'}}}
    </div>
  `;
  }
}
