import Block from 'core/Block';

import './textArea.css';

export class TextArea extends Block {
  render() {
    // language=hbs
    return `
    <div class="textarea__conteiner">
      {{{Button className="__textarea__button-adds"}}}
      <textarea class="textarea__message" id="message" name="message" rows="5" cols="33" placeholder="Message">
      </textarea>
      {{{Button className="__textarea__button-send"}}}
    </div>`;
  }
}
