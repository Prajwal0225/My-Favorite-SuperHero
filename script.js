var BaseUrl = "https://superheroapi.com/api.php/136899909020706";

const btn = document.getElementById('newherrobtn')
const heroImageDiv = document.getElementById('heroImage')
const searchbtn = document.getElementById('searchId')
const searchInput = document.getElementById('SearchInput')
const toggleButtton = document.querySelector(".toggle-button");
const linkContainer = document.querySelector(".links-container");



toggleButtton.addEventListener('click',()=>{
  linkContainer.classList.toggle("active");
 
  
})




const getSupperHero = (id) => {
  fetch(`${BaseUrl}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      const name = `<h2>${json.name}</h2>`;
      heroImageDiv.innerHTML = `${name} <img src= "${json.image.url}" height=400
    width=300/>`;
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
      } else {
        heroImageDiv.innerHTML = `<p>No superhero found for "${name}"</p>`;
      }
    })
    .catch((error) => {
      console.error(`Error fetching superhero data: ${error}`);
    });
};


const randomid =()=> {
  return Math.floor(Math.random() * 731)+1
}


btn.onclick = () => {
  searchInput.value = "";
  getSupperHero(randomid())
}


btn.onclick = () => getSupperHero(randomid());

searchbtn.onclick = () => getSearchSuperHero(searchInput.value);
