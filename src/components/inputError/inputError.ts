import Block from '../../core/Block';

import './inputError.css';

interface ErrorProps {
  id?: string;
  className?: Array<string>;
  message?: string;
}

export class InputError extends Block {
  constructor({ id, className, message }: ErrorProps) {
    super({ id, className, message });
  }

  protected render(): string {
    // language=hbs
    return `<div id="{{id}}" class="{{className}}">{{message}}</div>`;
  }
}
