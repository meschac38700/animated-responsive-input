const myName = new Proxy({value: "Eliam LOTONGA"}, {
  set(obj, key, value){
    if(Reflect.has(obj, key)){
      Reflect.set(obj, key, value)
      document.querySelector("input-element")
        .setAttribute("value", Reflect.get(obj, key))
    }
    return true;
  },
  get(obj, key){
    return obj[key]
  }
})
// Event Callbacks
const onChange = (value) => {
  console.log("onChange: ", value)
  myName.value=value
}
const onInput = (value) => {
  console.log("onInput: ", value)
  myName.value=value
}

const onKeyup = (key) => console.log("keyUp", key)
const onKeydown = (key) => console.log("keyDown", key)
