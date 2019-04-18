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
  .add-new-card-button {
    margin:20px;
  }
  </style>
  <div class="column">
    <button class="add-new-card-button">Add New Card</button>
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
    this.$addNewCard = this._shadowRoot.querySelector('.add-new-card-button')
  }

  async connectedCallback() {
    let columnTitle = this.$columnTitle.innerText
    let columnId = parseInt(this.$column.id)
    this.$deleteButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('deleteColumn', { detail: columnId }))
    })
    this.$editButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('editColumn', { detail: {id: columnId, title: columnTitle} }))
    })
    this.$addNewCard.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('addNewCard', { detail: columnId }))
    })
  }

  set title (value) {
    this.$columnTitle.innerHTML = value
  }
  set id (value) {
    this.$column.id = value
  }


  deleteCard (evt) {
    const that = this
    const url = 'http://localhost:3000/cards'
    fetch(url + '/' + evt.detail, {
      method: 'delete'
    }).then( () =>     this.test() )
    .catch(error => console.error('Error:', error))
  }

  set card (value) {
    let cardElement = document.createElement('card-element')
    cardElement.description = value.description
    cardElement.title = value.title
    cardElement.id = value.id
    cardElement.addEventListener('deleteCard', this.deleteCard.bind(this))
    this.$columnBody.appendChild(cardElement)
  }
}

customElements.define('column-element', Column)
