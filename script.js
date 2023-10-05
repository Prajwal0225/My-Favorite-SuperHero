var BaseUrl = "https://superheroapi.com/api.php/136899909020706";

const btn = document.getElementById("newherrobtn");
const heroImageDiv = document.getElementById("heroImage");
const searchbtn = document.getElementById("searchId");
const searchInput = document.getElementById("SearchInput");
const downloadImageBtn = document.getElementById("downloadImg"); // download the image
// const toggleButtton = document.querySelector(".toggle-button");
// const linkContainer = document.querySelector(".links-container");

const getCurrentYear = () => {
  const yearElement = document.getElementById("year");
  yearElement.textContent = new Date().getFullYear();
};
getCurrentYear();

// toggleButtton.addEventListener('click',()=>{
//   linkContainer.classList.toggle("active");
// })

const getSupperHero = (id) => {
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const name = `<h2>${json.name}</h2>`;
      heroImageDiv.innerHTML = `${name} <div class="img_container"> <img src= "${json.image.url}"/> </div>`;

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
        console.log(hero);
        const hero2 = `<h2>${name}</h2>`;
        heroImageDiv.innerHTML = `${hero2} <img src="${hero.image.url}" height=400 width=300 class="zoom-effect" data-aos="flip-left"/>`;

        console.log(hero.image.url);
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

// Function to handle search
const handleSearch = () => {
  const inputValue = searchInput.value.trim();

  if (inputValue !== "") {
    getSearchSuperHero(inputValue);
  } else {
    alert("Input is empty. Please enter a hero name.");
  }
};

// Event listener for search button click
searchbtn.addEventListener("click", handleSearch);

//Event listener to clear placeholder on focus
searchInput.addEventListener("focus", function () {
  searchInput.placeholder = "";
});

//Event listener to add placeholder on focus out
searchInput.addEventListener("blur", function () {
  searchInput.placeholder = "Type Your Hero Name";
});

// Event listener for Enter key press on the input field
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
