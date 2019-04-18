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
    .card-description {
      display: none;
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
    <button class="card-description-button">Read Description</button>
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
    this.$cardDescriptionButton = this._shadowRoot.querySelector('.card-description-button')
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
  set columnId (value) {
    this.$columnId = value
  }
  connectedCallback () {
    this.$cardDescriptionButton.addEventListener('click', (e) => {
      this.$cardDescription.style.display = 'block'
    })
    this.$deleteButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('deleteCard', { detail: this.$cardId }))
    })
    this.$editButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('editCard', {
        detail: {
          id:this.$cardId,
          title: this.$cardTitle.innerText,
          description: this.$cardDescription.innerText,
          columnId: this.$columnId
        }
      }))
    })
  }
}

customElements.define('card-element', Card)
