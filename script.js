var BaseUrl = "https://superheroapi.com/api.php/136899909020706";

const btn = document.getElementById("newherrobtn");
const heroImageDiv = document.getElementById("heroImage");
const searchbtn = document.getElementById("searchId");
const searchInput = document.getElementById("SearchInput");

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

        heroImage.classList.add("animate-fade-in");

      }
       else {
        console.log("Not exists")
      }
    })
    .catch((error) => {
      console.log(error);
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
