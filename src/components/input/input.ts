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
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class Input extends Block {
  constructor({
    type = 'text',
    placeholder,
    value,
    error,
    id,
    label,
    className,
    onChange,
    onFocus,
    onBlur,
  }: InputProps) {
    super({
      type,
      placeholder,
      value,
      error,
      id,
      label,
      className,
      events: { input: onChange, focusin: onFocus, focusout: onBlur },
    });
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
