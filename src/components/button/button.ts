import Block from 'core/Block';
import Router from 'core/Router';
import './button.css';

interface ButtonProps {
  text?: string;
  type?: string;
  className: string;
  events: { [key: string]: () => {} };
  to?: string;
}

export class Button extends Block {
  static nameOfComponent = 'Button';

  constructor(props: ButtonProps) {
    const to = props.to
      ? {
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              const router = new Router('.app');
              if (this.props.to === 'back') {
                router.back();
                return;
              }
              router.go(this.props.to);
            },
          },
        }
      : {};
    super({ ...props, ...to });
  }
  protected render(): string {
    // language=hbs
    return `
      <div class="button">
        <button class="{{className}}" type="{{type}}">{{text}}</button>
      </div>
    `;
  }
}
