import Handlebars, { HelperOptions } from 'handlebars';
import Block from 'core/Block';

interface BlockConstructable<Props = any> {
  new (props: Props): Block;
  nameOfComponent: string;
}

export default function registerComponent(Component: BlockConstructable) {
  Handlebars.registerHelper(Component.nameOfComponent, ({ hash: { ref, ...hash }, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component.getContent();
    }

    return `<div data-id="${component.id}"></div>`;
  });
}
