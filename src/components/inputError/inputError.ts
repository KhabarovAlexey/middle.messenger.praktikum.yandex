import Block from 'core/Block';

import './inputError.css';

interface ErrorProps {
  error: string
  className: string
}
export class InputError extends Block {
  static nameOfComponent = 'InputError'

  constructor(props: ErrorProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `<div class="{{className}}">{{error}}</div>`;
  }
}
