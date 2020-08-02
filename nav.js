const nav = document.querySelector(".nav");
const navLinks = nav.querySelectorAll("a");
const CATEGORY_NAME = ".nav__category-name";
const CATEGORY_LI = ".nav__category";

let selected = window.location.href.substring(22); //get pure category from the url
if (selected === "") {
  //if the pages is home
  navLinks[0].querySelector(CATEGORY_LI).classList.add("selected");
}
for (var i = 1; i < navLinks.length; i++) {
  //give href address to the links except home
  const categoryName = navLinks[i]
    .querySelector(CATEGORY_NAME)
    .innerText.replace(/(\s*)/g, "");
  navLinks[i].href = `/${categoryName}`;
  if (categoryName === selected) {
    navLinks[i].querySelector(CATEGORY_LI).classList.add("selected");
  }
}
