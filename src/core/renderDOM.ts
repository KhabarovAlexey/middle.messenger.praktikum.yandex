import Block from 'core/Block';

export default function renderDOM(block: Block) {
  // const block = new BlockPage();

  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
