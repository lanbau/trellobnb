import './card-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
  .column {
    background-color:white;
    width:300px;
    height:800px;
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
  .search {
    margin-left:20px;
  }
  </style>
  <div class="column">
    <button class="add-new-card-button">Add New Card</button>
    <br>
    <div class="search">
      <input class="search-input" placeholder="Search" />
      <button class="search-button">Search</button>
    </div>
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
    this.$searchInput = this._shadowRoot.querySelector('.search-input')
    this.$searchButton = this._shadowRoot.querySelector('.search-button')

    this.$column = this._shadowRoot.querySelector('.column')
    this.$column.addEventListener('drop', this.onDrop.bind(this))
    this.$column.addEventListener('dragover', this.onDragover.bind(this))

  }
  onDrop (event) {
    event.preventDefault()
    const columnDropId = this.$column.id
    var dragData = event.dataTransfer.getData("Text")
    let evt = JSON.parse(dragData)
    const url = 'http://localhost:3000/cards' + '/' + evt.id
    const data = {
      title: evt.title,
      description: evt.description,
      columnId: columnDropId
    }
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then( () => this.refreshData())
    .catch(error => console.error('Error:', error))
  }
  onDragover (event) {
    event.preventDefault();
  }

  deleteColumnEvent (columnId) {
    this.dispatchEvent(new CustomEvent('deleteColumn', { detail: columnId }))
  }

  editColumnEvent (columnId, columnTitle) {
    this.dispatchEvent(new CustomEvent('editColumn', { detail: {id: columnId, title: columnTitle} }))
  }

  addNewCardEvent (columnId) {
    this.dispatchEvent(new CustomEvent('addNewCard', { detail: columnId }))
  }

  searchColumnCardsEvent (columnId) {
    this.dispatchEvent(new CustomEvent('searchColumnCards', {
      detail: {
        id: columnId,
        query: this.$searchInput.value
      }
    }))
  }

  async connectedCallback() {
    let columnTitle = this.$columnTitle.innerText
    let columnId = parseInt(this.$column.id)
    this.$deleteButton.addEventListener('click', (e) => {
      this.deleteColumnEvent(columnId)
    })
    this.$editButton.addEventListener('click', (e) => {
      this.editColumnEvent(columnId, columnTitle)
    })
    this.$addNewCard.addEventListener('click', (e) => {
      this.addNewCardEvent(columnId)
    })
    this.$searchButton.addEventListener('click', (e) => {
      this.searchColumnCardsEvent(columnId)
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
    }).then( () => this.refreshData() )
    .catch(error => console.error('Error:', error))
  }

  editCard (evt) {
    this.editCardForm(evt.detail)
  }

  set card (value) {
    let cardElement = document.createElement('card-element')
    cardElement.description = value.description
    cardElement.title = value.title
    cardElement.id = value.id
    cardElement.columnId = value.columnId
    cardElement.addEventListener('deleteCard', this.deleteCard.bind(this))
    cardElement.addEventListener('editCard', this.editCard.bind(this))
    this.$columnBody.appendChild(cardElement)
  }
}

customElements.define('column-element', Column)
