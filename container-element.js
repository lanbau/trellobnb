import './column-element.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .main-container {
      display: flex;
      background-color: teal;
    }
    .left-container {
      width: 75%;
      background-color: teal;
    }
    .add-new-column-button {
      margin-top:20px;
      margin-left:20px;
    }
    .columns {
      padding: 30px;
      display:flex;
      flex-wrap: wrap;
    }
    .right-container {
      width: 25%;
      background-color: lightgrey;
    }
  </style>
  <div class="main-container">
    <div class="left-container">
      <button class="add-new-column-button">Add New Column</button>
      <div class="columns">
      </div>
    </div>
    <div class="right-container"></div>
  </div>
`

class Container extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$mainContainer = this._shadowRoot.querySelector('.main-container')
    this.$leftContainer = this._shadowRoot.querySelector('.left-container')
    this.$rightContainer = this._shadowRoot.querySelector('.right-container')
    this.$columns = this._shadowRoot.querySelector('.columns')
    this.$addNewColumnButton = this._shadowRoot.querySelector('.add-new-column-button')
    this.$addNewColumnButton.addEventListener('click', this.addNewColumn)
  }
  async fetchColumns () {
    const res = await fetch ('http://localhost:3000/columns')
    const json = await res.json()
    return json
  }

  async fetchCards () {
    const res = await fetch ('http://localhost:3000/cards')
    const json = await res.json()
    return json
  }

  async fetchData () {
    const columns = await this.fetchColumns()
    const cards = await this.fetchCards()
    columns.forEach(column => {
      let columnElement = document.createElement('column-element')
      columnElement.id = column.id
      columnElement.title = column.title
      cards.forEach(card => {
        if (card.columnId == column.id) {
          columnElement.card = card
        }
      })
      this.$columns.appendChild(columnElement)
    })
  }

  async connectedCallback() {
    await this.fetchData()
  }

  async addNewColumn (item) {
    console.log('add new columns')
    const res = await fetch ('http://localhost:3000/columns')
    const columns = await res.json()
    const newColumnId = columns.length + 1
    const url = 'http://localhost:3000/columns';
    const data = {id:newColumnId, title: `Column ${newColumnId}` };
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }
}

customElements.define('container-element', Container)
