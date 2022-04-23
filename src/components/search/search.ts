import Block from 'core/Block';

import './search.css';

export class Search extends Block {
  render() {
    // language=hbs
    return `
    <form class="search-form">
      <div class="search-form__content">
        <input class="search-form__input" id="search" placeholder="Search..."/>
      </div>
    </form>`;
  }
}
