const template = document.createElement('template')
template.innerHTML = `
  <style></style>
  <div>
    <div class="column-id"></div>
    <input class="column-title" placeholder="Column Title"/>
    <button>Modify Column</button>
  </div>
`

class ColumnForm extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$columnId = this._shadowRoot.querySelector('.column-id')
    this.$columnTitle = this._shadowRoot.querySelector('.column-title')

  }
}

customElements.define('column-form-element', ColumnForm)
