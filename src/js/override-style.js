/** Override styles */

document.querySelectorAll("input-element").forEach(function(el) {
  const style = document.createElement("style")
  style.innerHTML = `
    .input-group {
      --height: 40px;
      --extended-width: 240px;
      --padding: .4em;
      --border-color: #3e086a;
      --bg-start-color: #5e5e5e;
      --bg-end-color: #3c0f02;
      --text-color: #fbfbfb;
      --icon-color: rgb(100, 89, 86);
      --icon-active-color: rgb(202, 123, 101);
      --placeholder-color: #9492db;
  }`
  el.shadowRoot.appendChild(style)
})