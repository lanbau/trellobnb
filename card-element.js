const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card {
      background-color:lightgrey;
      margin:10px;
      padding:30px;
    }
    .card-header {
      display:flex;
      justify-content: space-between;
    }
    .card-actions {
      display:flex;
      margin-bottom:5px;
    }
  </style>
  <div class="card">
    <div class="card-header">
      <div class="card-title"></div>
      <div class="card-actions">
        <button class="card-edit-button">Edit</button>
        <button class="card-delete-button">X</button>
      </div>
    </div>
    <div class="card-description"></div>
  </div>
`

class Card extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$cardTitle = this._shadowRoot.querySelector('.card-title')
    this.$cardDescription = this._shadowRoot.querySelector('.card-description')
    this.$editButton = this._shadowRoot.querySelector('.card-edit-button')
    this.$deleteButton = this._shadowRoot.querySelector('.card-delete-button')
  }
  set description (value) {
    this.$cardDescription.innerHTML = value
  }
  set title (value) {
    this.$cardTitle.innerHTML = value
  }
  set id (value) {
    this.$cardId = value
  }
  connectedCallback () {
    this.$deleteButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('deleteCard', { detail: this.$cardId }))
    })
  }
}

customElements.define('card-element', Card)
