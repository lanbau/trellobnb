import './column-element.js'
import './column-form-element.js'

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
    this.$addNewColumnButton.addEventListener('click', this.addNewColumn.bind(this))
  }
  async addNewColumn (item) {
    const columns = await this.fetchColumns()
    const newColumnId = columns.length + 1
    const url = 'http://localhost:3000/columns'
    const data = {id:newColumnId, title: `Column ${newColumnId}` }
    const that = this
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(function () {
      that.fetchData()
    })
    .catch(error => console.error('Error:', error))

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
    this.$columns.innerHTML = ''
    const columns = await this.fetchColumns()
    const cards = await this.fetchCards()
    columns.forEach(column => {
      let columnElement = document.createElement('column-element')
      columnElement.id = column.id
      columnElement.title = column.title
      columnElement.addEventListener('deleteColumn', this.deleteColumn.bind(this))
      columnElement.addEventListener('editColumn', this.editColumn.bind(this))
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
    const form = document.createElement('column-form-element')
    this.$rightContainer.appendChild(form)

  }

  deleteColumn (evt) {
    const that = this
    const url = 'http://localhost:3000/columns'
    fetch(url + '/' + evt.detail, {
      method: 'delete'
    }).then( () => that.fetchData() )
    .catch(error => console.error('Error:', error))
  }

  editColumn (evt) {
    const columnForm = this.$rightContainer.querySelector('column-form-element')
    columnForm.addEventListener('confirmEditColumn', this.confirmEditColumn.bind(this))
    columnForm.data = evt.detail
  }

  confirmEditColumn (evt) {
    console.log(evt.detail)
    const url = 'http://localhost:3000/columns' + '/' + evt.detail.id.toString()
    const data = { title: evt.detail.title }
    console.log(data)
    const that = this
    console.log(url)
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
      }
    })
    .then( (res) => {
      console.log(res)
      that.fetchData()
    })
    .catch(error => console.error('Error:', error))
  }

}

customElements.define('container-element', Container)
