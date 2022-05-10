import Block from 'core/Block';

import './input.css';

interface InputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  error?: string;
  id?: string;
  label?: string;
  className?: string;
  events: { [key: string]: () => {} }
  errorName: string,
}

export class Input extends Block {
  static nameOfComponent = 'Input'

  constructor(props: InputProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="{{className}}">
        <input id="{{id}}" class="input__input" type="{{type}}" name="{{id}}" placeholder="{{placeholder}}" value="{{value}}" autocomplete=false>
        <label for="{{id}}" class="input__label">{{label}}</label>
      </div>
    `;
  }
}
