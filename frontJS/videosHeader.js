const videosSort = document.querySelector(".videos__sort");
const sortStandards = videosSort.querySelector(".videos__sort-standards");

let sortClick = 0;

const showSortStandards = (e) => {
  if (sortStandards.classList.contains("showing")) {
    sortClick = 0;
  } else {
    sortStandards.classList.add("showing");
    sortStandards.classList.remove("hidden");
    sortClick = 1;
  }
};

const hideSortStandards = (e) => {
  if (sortClick !== 1) {
    sortStandards.classList.add("hidden");
    sortStandards.classList.remove("showing");
  }
  sortClick = 0;
};

const paintSelectedSort = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let selectedIndex = 2;
  if (urlParams.get("sort")) {
    selectedIndex = parseInt(urlParams.get("sort")) - 1;
  }
  sortStandards
    .querySelectorAll(".videos__sort-standard")
    [selectedIndex].classList.add("selected");
};

paintSelectedSort();
document.body.addEventListener("click", hideSortStandards);
videosSort.addEventListener("click", showSortStandards);
