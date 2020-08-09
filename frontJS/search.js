const header = document.querySelector("header");
const headerSearch = header.querySelector("form");
const headerSearchInput = headerSearch.querySelector("input");

const handleHeaderSearchSubmit = (e) => {
  if (headerSearchInput.value === "") {
    e.preventDefault();
  }
};

headerSearch.addEventListener("submit", handleHeaderSearchSubmit);
