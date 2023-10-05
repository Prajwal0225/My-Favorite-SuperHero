//get  api key  from https://superheroapi.com/index.html
var BaseUrl = "Your_API_KEY";



// Get page elements
const btn = document.getElementById('newherrobtn')
const heroImageDiv = document.getElementById('heroImage')
const searchbtn = document.getElementById('searchId')
const searchInput = document.getElementById('SearchInput')
const downloadImageBtn = document.getElementById("downloadImg"); // download the image

// Get current year for footer
const getCurrentYear = () => {
  const yearElement = document.getElementById("year");
  yearElement.textContent = new Date().getFullYear();
};
getCurrentYear();




// Fetch hero data by ID 
const getSupperHero = (id) => {
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const name = `<h2>${json.name}</h2>`;
      heroImageDiv.innerHTML = `${name} <img src= "${json.image.url}" height=400 width=300/>`;

      console.log(json.image.url);
      downloadImageBtn.addEventListener('click', () => {
               const imageUrl = json.image.url;
                downloadImage(imageUrl);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            heroImageDiv.innerHTML = '<p> An error occurred while fetching data.</p>';
        });
};
// Fetch hero data by name
const getSearchSuperHero = (name) => {
  // API call
  fetch(`${BaseUrl}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      // Display results or error message
      if (json.results && json.results.length > 0) {
            // Display hero
        const hero = json.results[0];
        console.log(hero);
        const hero2 = `<h2>${name}</h2>`;
        heroImageDiv.innerHTML = `${hero2} <img src="${hero.image.url}" height=400 width=300 class="zoom-effect" data-aos="flip-left"/>`;

        console.log(hero.image.url);
          // Set up image download
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
// Generate random ID
const randomid = () => {
  return Math.floor(Math.random() * 731) + 1;
};
// Click handler to fetch random hero
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

// Event listener for Enter key press on the input field
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

