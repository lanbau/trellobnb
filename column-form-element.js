const template = document.createElement('template')
template.innerHTML = `
  <style></style>
  <div>
    <h1>Column Edit Form</h1>
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

  set data (value) {
    this.$columnId.innerHTML = `Column ${value.id}`
    this.$columnTitle.value = value.title
  }
}

customElements.define('column-form-element', ColumnForm)
