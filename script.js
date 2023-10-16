var BaseUrl = "https://superheroapi.com/api.php/136899909020706";

const btn = document.getElementById("newherrobtn");
const heroImageDiv = document.getElementById("heroImage");
const searchbtn = document.getElementById("searchId");
const searchInput = document.getElementById("SearchInput");
const downloadImageBtn = document.getElementById("downloadImg"); // download the image

searchInput.addEventListener("focus", function () {
  searchInput.placeholder = "";
});

searchInput.addEventListener("blur", function () {
  searchInput.placeholder = "Find Your Hero";
});

const getCurrentYear = () => {
  const yearElement = document.getElementById("year");
  yearElement.textContent = new Date().getFullYear();
};
getCurrentYear();

// toggleButtton.addEventListener('click',()=>{
//   linkContainer.classList.toggle("active");
// })

let hname = document.getElementById("hname");
let hstr = document.getElementById("hstr");
let hgen = document.getElementById("hgen");
let hspe = document.getElementById("hspe");
let hplac = document.getElementById("hplac");
let hfap = document.getElementById("hfap");

const getSupperHero = (id) => {
  heroImageDiv.innerHTML = `
  <div class="hero-image-placeholder" height=400 width=300>
    <i class="mask-loader-icon fa-solid fa-mask"></i>
  </div>
  `;
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const name = `${json.name}`;
      const hero2 = `<h2>${name}</h2>`;
      heroImageDiv.append();
      heroImageDiv.innerHTML =  `${hero2} <img src= "${json.image.url}" height=400 width=300/>`;
      hname.innerHTML = `${json.name}`;
      hstr.innerHTML = `${json.powerstats.strength}`;
      hspe.innerHTML = `${json.powerstats.speed}`;
      hgen.innerHTML = `${json.appearance.gender}`;
      hplac.innerHTML = `${json.biography["place-of-birth"]}`;
      hfap.innerHTML = `${json.biography["first-appearance"]}`;

      console.log(json.image.url);
      downloadImageBtn.addEventListener("click", () => {
        const imageUrl = json.image.url;
        downloadImage(imageUrl);
      });
    });
};

const getSearchSuperHero = (name) => {
  fetch(`${BaseUrl}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.results && json.results.length > 0) {
        const hero = json.results[0];
        const hero2 = `<h2>${hero.name}</h2>`;
        hname.innerHTML = `${hero.name}`;
        hstr.innerHTML = `${hero.powerstats.strength}`;
        hspe.innerHTML = `${hero.powerstats.speed}`;
        hgen.innerHTML = `${hero.appearance.gender}`;
        hplac.innerHTML = `${hero.biography["place-of-birth"]}`;
        hfap.innerHTML = `${hero.biography["first-appearance"]}`;
        heroImageDiv.append();
        heroImageDiv.innerHTML = `${hero2} <img src= "${hero.image.url}" height=400 width=300/>`;

        downloadImageBtn.addEventListener("click", () => {
          const imageUrl = hero.image.url;
          downloadImage(imageUrl);
        });
      } else {
        heroImageDiv.innerHTML = `<p class="error">The superhero with this name ${name} does not exist on the website</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      heroImageDiv.innerHTML = `<p> An error occurred while fetching data.</p>`;
    });
};

// Download the image function
function downloadImage(imageUrl) {
  const aTag = document.createElement("a");
  aTag.href = imageUrl;
  aTag.download = imageUrl.split("/").pop();
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
}

const randomid = () => {
  return Math.floor(Math.random() * 731) + 1;
};

btn.onclick = () => getSupperHero(randomid());

searchbtn.onclick = () => {
  const inputValue = searchInput.value.trim(); // Trim any leading/trailing spaces
  if (inputValue !== "") {
    getSearchSuperHero(inputValue);
  } else {
    // Handle the case where the input is empty (e.g., show an error message).
    alert("Input is empty. Please enter a hero name.");
  }
};

searchInput.addEventListener("keyup", (e) => {
  const inputValue = searchInput.value.trim();
  if (e.keyCode === 13) {
    getSearchSuperHero(inputValue);
  }
});

(function ($) {
  // Begin jQuery
  $(function () {
    // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(function () {
      $(".nav-dropdown").hide();
    });
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(function () {
      $("nav ul").slideToggle();
    });
    // Hamburger to X toggle
    $("#nav-toggle").on("click", function () {
      this.classList.toggle("active");
    });
  }); // end DOM ready
})(jQuery); // end jQuery
