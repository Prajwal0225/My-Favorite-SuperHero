var BaseUrl = "https://superheroapi.com/api.php/136899909020706"

const btn = document.getElementById('newherrobtn')
const heroImageDiv = document.getElementById('heroImage')
const searchbtn = document.getElementById('searchId')
const searchInput = document.getElementById('SearchInput')


const getSupperHero = (id) =>{
  fetch(`${BaseUrl}/${id}`)
  .then(response => response.json())
  .then(json =>{
    //console.log(json)
    const name = `<h2>${json.name}</h2>`
    heroImageDiv.innerHTML = `${name} <img src= "${json.image.url}" heiht=200
    width=200/>`
    })
}

const getSearchSuperHero = (name) =>{
   fetch(`${BaseUrl}/search/${name}`)
  .then(response => response.json())
  .then(json =>{
    const hero = json.results[0]
    // console.log(hero)
    const hero2 = `<h2>${name}</h2>`
    heroImageDiv.innerHTML = `${hero2} <img src= "${hero.image.url}" heiht=200 width=200/>`
    })
}


const randomid =()=> {
  return Math.floor(Math.random() * 731)+1
}


btn.onclick = () => {
  searchInput.value = "";
  getSupperHero(randomid())
}


searchbtn.onclick = () => getSearchSuperHero(searchInput.value)
