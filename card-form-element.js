const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card-form {
      padding: 30px;
    }
    .card-title {
      font-size:14px;
    }
    .card-description {
      font-size:14px;
    }
  </style>
  <div class="card-form">
    <h1>Card Edit Form</h1>
    Card Id: <div class="card-id"></div>
    <input class="card-title" placeholder="Card Title"/>
    <br>
    <textarea class="card-description" placeholder="Card Description"></textarea>
    <br>
    <button class="card-edit-button">Modify Card</button>
  </div>
`

class CardForm extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ 'mode': 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$cardId = this._shadowRoot.querySelector('.card-id')
    this.$cardTitle = this._shadowRoot.querySelector('.card-title')
    this.$cardDescription = this._shadowRoot.querySelector('.card-description')
    this.$cardEditButton = this._shadowRoot.querySelector('.card-edit-button')
  }

  set data (value) {
    console.log(value)
    this.$cardId.innerHTML = value.id
    this.$cardTitle.value = value.title
    this.$cardDescription.value = value.description
    this.$cardColumnId = value.columnId

  }

  connectedCallback () {
    this.$cardEditButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('confirmEditCard', {
        detail: {
          id:this.$cardId.innerText,
          title: this.$cardTitle.value,
          description: this.$cardDescription.value,
          columnId: this.$cardColumnId
        }
      }))
    })
  }
}

customElements.define('card-form-element', CardForm)
