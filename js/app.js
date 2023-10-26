// start aos
AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".navigation .hamburger");
  const list = document.querySelector(".navigation .list");

  hamburger.addEventListener("click", (e) => {
    const isActive = e.currentTarget.classList.toggle("is-active");
    if (isActive) {
      list.style.display = "flex";
      list.style.position = "unset";
      setTimeout(() => {
        list.style.transform = "rotateZ(0deg)";
      }, 100);
    } else {
      list.style.transform = "rotateZ(140deg)";
      setTimeout(() => {
        list.style.display = "none";
        list.style.position = "absolute";
      }, 500);
    }
  });

  getActivePage();

  /**
   * add class 'active' at '.list > a' equal with current page
   */
  function getActivePage() {
    let current = location.pathname;
    let nth = -1;
    if (current === "/index.html" || current === "/") nth = 1;
    else if (current.includes("about")) nth = 2;
    else if (current.includes("contributor")) nth = 3;

    if (!nth) return;
    const allLink = document.querySelectorAll(".navigation .list a");
    const a = document.querySelector(`.navigation .list a:nth-child(${nth})`);
    if (a) {
      allLink.forEach((node) => node.classList.remove("active"));
      a.classList.add("active");
    }
  }
});
