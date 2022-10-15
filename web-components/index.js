// Web Components 入门实例教程 https://www.ruanyifeng.com/blog/2019/08/web_components.html
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });
    const templateElem = document.getElementById("userCardTemplate");
    const content = templateElem.content.cloneNode(true);
    const attrNames = this.getAttributeNames();
    console.log("attrs", attrNames);
    content
      .querySelector("img")
      .setAttribute("src", this.getAttribute("image"));
    content.querySelector(".container>.name").innerText =
      this.getAttribute("name");
    content.querySelector(".container>.email").innerText =
      this.getAttribute("email");
    shadow.appendChild(content);
  }
}

window.customElements.define("user-card", UserCard);
