const template = document.createElement('template')
template.innerHTML = `
  <style>
    .column-form {
      padding: 30px;
    }
    .column-title {
      font-size:14px;
    }
  </style>
  <div class="column-form">
    <h1>Column Edit Form</h1>
    <div class="column-id"></div>
    <input class="column-title" placeholder="Column Title"/>
    <br>
    <button class="column-edit-button">Modify Column</button>
  </div>
`

class ColumnForm extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$columnId = this._shadowRoot.querySelector('.column-id')
    this.$columnTitle = this._shadowRoot.querySelector('.column-title')
    this.$columnEditButton = this._shadowRoot.querySelector('.column-edit-button')
  }

  confirmEditColumn (value) {
    this.dispatchEvent(new CustomEvent('confirmEditColumn', {
      detail: {
        id: value.id,
        title: this.$columnTitle.value}
      }
    ))
  }

  set data (value) {
    this.$columnId.innerHTML = `Column ${value.id}`
    this.$columnTitle.value = value.title
    this.$columnEditButton.addEventListener('click', (e) => {
      this.confirmEditColumn(value)
    })
  }
}

customElements.define('column-form-element', ColumnForm)
