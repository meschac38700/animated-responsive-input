

const Fields = {
  VALUE: "value",
  BIND: "bind",
  HEIGHT: "height",
  WIDTH: "width",
  PLACEHOLDER: "placeholder",
  AUTOCOMPLETE: "autocomplete"
}
export default class InputElement extends HTMLElement{

  #value = null
  #bind = null
  #height = null
  #width = null
  #placeholder = null
  #autocomplete = false
  instance = null

  constructor({bind=null, value="", height="45px", width="calc(var(--height) * 4.8)", placeholder="Enter some text...", autocomplete=false}={}){
    super()

    this.shadow = this.attachShadow({mode: "open"})

    this.bind = this.getAttribute(Fields.BIND) || bind
    this.value = this.bind ? eval(this.bind) : this.getAttribute(Fields.VALUE) || value
    this.height = this.getAttribute(Fields.HEIGHT) || height
    this.width = this.getAttribute(Fields.WIDTH) || width
    this.placeholder = this.getAttribute(Fields.PLACEHOLDER) ?? placeholder
    this.autocomplete = this.getAttribute(Fields.AUTOCOMPLETE)  || autocomplete

    this.group = document.createElement("div")
    this.group.setAttribute("id", "input-group")
    this.group.setAttribute("class", "input-group")

    this.icon = document.createElement("span")
    this.icon.id = "input-icon"
    this.icon.setAttribute("class", "input-icon")

    this.input = document.createElement("input")
    this.input.setAttribute("type", "text")
    this.input.setAttribute("id", "input")
    this.input.setAttribute("class", "input-control")

    this.#initInstance()
  }

  static get observedAttributes() {
    return [ Fields.PLACEHOLDER, Fields.AUTOCOMPLETE, Fields.HEIGHT, Fields.WIDTH, Fields.VALUE ]
  }

  get #groupStyle(){
    return `.input-group{
      --height: ${this.height};
      --extended-width: ${this.width};
      --padding: .4em;
      --border-color: #876ed2/*#9376e9*/;
      --bg-start-color: #5b34cf/*#1e143b*/;
      --bg-end-color: #070410;
      --text-color: var(--border-color);

      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--height);
      min-width: var(--height);
      background: linear-gradient(to right, var(--bg-start-color), var(--bg-end-color));
      border: 1px solid var(--border-color);
      border-radius: calc((var(--height) / 2));
      outline: none;
    }`
  }

  get #inputStyle(){
    return `.input-control{
      height: 100%;
      width: 0;
      padding: 0;
      font-size: calc(var(--height) * 0.3);
      background-color: transparent;
      color: var(--text-color);
      border: none;
      outline: none;
      transition: .3s padding ease-in-out,  .3s width ease-in-out;
    }
    .input-group:hover .input-control,
    .input-control:focus,
    .input-control[value]:not([value=""]){
      --text-color: #fff;

      width: var(--extended-width);
      border-radius: calc((var(--height) / 2) + (var(--padding) / 2));
      padding-left: calc(var(--padding) * 2);
    }
    .input-control::placeholder{
      color: #e2e2e2;
    }`
  }

  get #iconStyle(){
    return `.input-icon{
      --padding: 1.4em;

      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(var(--height) * 0.9 );
      height: calc(var(--height) * 0.9 );
      color: var(--text-color);
      cursor: pointer;
      transition: .3s color ease-in-out, .3s padding ease-in-out;
    }
    .input-icon > svg{
      flex: none;
      width: calc(var(--height) * 0.4 );
    }
    .input-group:hover .input-icon,
    .input-control:focus + .input-icon{
      --text-color: #fff;
      padding-right: var(--padding);
      padding-left: calc(var(--padding) * 0.7);
    }
    .input-control[value]:not([value=""]) + .input-icon{
      padding-right: var(--padding);
      padding-left: calc(var(--padding) * 0.7);
    }`
  }

  /**
   * Add proxy on instance variable
   */
  #initInstance(){
    this.instance = new Proxy(this,{
      set(self, key, value ){
        if(Reflect.has(self, key)){

          if([Fields.PLACEHOLDER, Fields.VALUE].includes(key))
            self.input.setAttribute(key, value)

          if(key === Fields.WIDTH && !value)
            value = "calc(var(--height) * 4.8)"

          Reflect.set(self, key, value);
          
          self.render() 
        }
        return true
      },
      get(self, key){
        return Reflect.get(self, key)
      }
    })
  }

  #addStyles(){
    const style = document.createElement("style")
    style.innerText = `
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .content{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 2em;
      min-height: 100vh;
      background: linear-gradient(to top, rgb(25, 14, 63), rgb(72, 47, 155));
    }
    ${this.#groupStyle}
    ${this.#inputStyle}
    ${this.#iconStyle}
    `
    this.shadow.appendChild(style)
  }

  #clearChildren() {
    this.shadow.innerHTML = ""
  }

  connectedCallback(){

    this.icon.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.input.focus()
    })

    this.input.addEventListener("change", function(e){
      this.setAttribute(Fields.VALUE, this.value)
    })
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue !== newValue){
      this.instance[name] = newValue
    }
  }

  render(){
    this.#clearChildren()
    this.#addStyles()
    this.icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
    </svg>
    `
    this.input.setAttribute(Fields.PLACEHOLDER, this.placeholder)
    this.input.setAttribute(Fields.VALUE, this.value)
    if(!this.autocomplete)
      this.input.setAttribute(Fields.AUTOCOMPLETE,  "off")

    this.group.appendChild(this.input)
    this.group.appendChild(this.icon)
    this.shadow.appendChild(this.group)
  }

}

customElements.define("input-element", InputElement)