const myName = new Proxy({value: "Eliam LOTONGA"}, {
  set(obj, key, value){
    if(Reflect.has(obj, key)){
      Reflect.set(obj, key, value)
    }
    return true;
  },
  get(obj, key){
    return obj[key]
  }
})

const myName2 = new Proxy({value: "Meschac LOTONGA"}, {
  set(obj, key, value){
    if(Reflect.has(obj, key)){
      Reflect.set(obj, key, value)
    }
    return true;
  },
  get(obj, key){
    return obj[key]
  }
})
// Event Callbacks
const onChange = (value) => {
  myName.value=value
}
const onInput = (value) => {
  myName.value=value
}

const onKeyup = (key) => console.log("keyUp", key)
const onKeydown = (key) => console.log("keyDown", key)

const onChange2 = function(value) {
  myName2.value=value
}
const onInput2 = (value) => {
  myName2.value=value
}
