import Block from 'core/Block';

import './link.css';

interface LinkProps {
  text: string;
  link: string;
  onClick: () => void;
}

export class Link extends Block {
  constructor({ text, link, onClick }: LinkProps) {
    super({ text, link, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `<a href="{{link}}" class="link__small">{{text}}</a>`;
  }
}
