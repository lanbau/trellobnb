import './card-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
  .column {
    background-color:white;
    width:300px;
    height:500px;
    margin:30px;
  }
  .column-title {
    text-align:center;
    padding:20px;
  }
  .column-header {
    padding: 20px;
    display:flex;
    justify-content: space-between;
  }
  .column-delete-button {
    width:40px;
    height:40px;
  }
  .column-edit-button {
    width:40px;
    height:40px;
  }
  </style>
  <div class="column">
    <div class="column-header">
      <div class="column-title"></div>
      <div>
        <button class="column-edit-button">Edit</button>
        <button class="column-delete-button">X</button>
      </div>
    </div>
    <div class="column-body"></div>
  </div>
`

class Column extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$column = this._shadowRoot.querySelector('.column')
    this.$columnTitle = this._shadowRoot.querySelector('.column-title')
    this.$columnBody = this._shadowRoot.querySelector('.column-body')

    this.$deleteButton = this._shadowRoot.querySelector('.column-delete-button')

    this.$editButton = this._shadowRoot.querySelector('.column-edit-button')
    
  }

  async connectedCallback() {
    let columnId = parseInt(this.$column.id)
    this.$deleteButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('deleteColumn', { detail: columnId }))
    })
    this.$editButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('editColumn', { detail: columnId }))
    })
  }

  set title (value) {
    this.$columnTitle.innerHTML = value
  }
  set id (value) {
    this.$column.id = value
  }

  set card (value) {
    let cardElement = document.createElement('card-element')
    cardElement.description = value.description
    this.$columnBody.appendChild(cardElement)
  }
}

customElements.define('column-element', Column)
