var BaseUrl = "https://superheroapi.com/api.php/136899909020706";






const btn = document.getElementById('newherrobtn')
const heroImageDiv = document.getElementById('heroImage')
const searchbtn = document.getElementById('searchId')
const searchInput = document.getElementById('SearchInput')
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
      heroImageDiv.innerHTML = `${name} <img src= "${json.image.url}" height=400 width=300/>`;

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
      const hero = json.results[0];

        if (hero) {
          const heroName = `<h2>${name}</h2>`;
          const heroImage = `<img src="${hero.image.url}" height=400 width=300/>`;

          heroImageDiv.innerHTML = `${heroName} ${heroImage}`;

          heroImage.classList.add("animate-fade-in");

        }
         else {
          console.log("Not exists")
        }

      console.log(hero.image.url);
        downloadImageBtn.addEventListener("click", () => {
          const imageUrl = hero.image.url;
          downloadImage(imageUrl);
        });
      })
    .catch((error) => {
      console.log(error);
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

searchbtn.onclick = () => getSearchSuperHero(searchInput.value);
