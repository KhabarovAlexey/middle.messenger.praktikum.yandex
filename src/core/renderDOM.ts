import Block from 'core/Block';

export default function renderDOM(query: string | undefined, block: Block) {
  const root = document.querySelector(query as string);
  if (root) {
    root.append(block.getContent());
    return root;
  }
  return false;
}
