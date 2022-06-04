document.getElementById("input").addEventListener("change", function(e){
  e.preventDefault()
  e.stopPropagation()
  this.setAttribute("value", this.value)
})
document.getElementById("input-icon").addEventListener("pointerdown", function(e){
  e.preventDefault()
  e.stopPropagation()
  document.querySelector("#input").focus()
})