var BaseUrl = "https://superheroapi.com/api.php/136899909020706";

var loader=`<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
<animateTransform attributeType="xml"
 attributeName="transform"
 type="rotate"
 from="0 25 25"
 to="360 25 25"
 dur="0.6s"
 repeatCount="indefinite"/>
</path>
</svg>`






const btn = document.getElementById('newherrobtn')
const heroImageDiv = document.getElementById('heroImage')
const searchbtn = document.getElementById('searchId')
const searchInput = document.getElementById('SearchInput')
const downloadImageBtn = document.getElementById("downloadImg"); // download the image
const loading = document.getElementById("loading");

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
  loading.innerHTML = loader;
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const name = `<h2>${json.name}</h2>`;
      heroImageDiv.innerHTML = `${name} <img src= "${json.image.url}" height=400 width=300/>`;

      console.log(json.image.url);
      downloadImageBtn.addEventListener("click", () => {
        const imageUrl = json.image.url;
        downloadImage(imageUrl);
      })
      loading.innerHTML = "";
    });
};

const getSearchSuperHero = (name) => {
  loading.innerHTML = loader;
  fetch(`${BaseUrl}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      console.log(hero);
      const hero2 = `<h2>${name}</h2>`;
      heroImageDiv.innerHTML = `${hero2} <img src= "${hero.image.url}" height=400 width=300/>`;
      loading.innerHTML = "";
      console.log(hero.image.url);
      downloadImageBtn.addEventListener("click", () => {
        const imageUrl = hero.image.url;
        downloadImage(imageUrl);
      });
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
