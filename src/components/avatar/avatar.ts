import Block from 'core/Block';
import './avatar.css';

export class Avatar extends Block {
  static nameOfComponent = 'Avatar';

  getStateFromProps() {
    this.state = {
      resourse: `${process.env.RESOURCES}`,
    };
  }

  render() {
    return `
    <div class="avatar">
      <label for="avatar__input" class="avatar__label"><img class="avatar__img" src="{{resourse}}{{img}}" /></label>
      <input type="file" accept="image/*" id="avatar__input" class="avatar__input" />
    </div>
    `;
  }
}
