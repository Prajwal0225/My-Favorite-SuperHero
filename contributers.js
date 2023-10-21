const container = document.querySelector('.contributors');
const maintainersContainer = document.querySelector('.maintainers');

document.addEventListener('DOMContentLoaded', () => {
  fetch('contributer.json')
    .then(res => {
      return res.json()
    })
    .then((data) => {
        console.log(data);
      data.forEach(user => {
        let contributorElement = document.createElement('div')
        let avatar = document.createElement('img')
        let userLink = document.createElement('a')
        let userName = document.createElement('h3')
        let userContributions = document.createElement('p')

        // contributorElement
        contributorElement.classList.add('contributor')
        avatar.classList.add('avatar')


        avatar.src = user.avatar_url;
        avatar.alt = `${user.login}'s avatar`;
        userName.textContent = user.login;
        userLink.href = user.html_url;
        userLink.target = '_blank';
        userLink.textContent = 'Profile'
        userContributions.textContent = `Contributions: ${user.contributions}`;

        contributorElement.appendChild(avatar)
        contributorElement.appendChild(userName)
        contributorElement.appendChild(userContributions)
        contributorElement.appendChild(userLink)

        container.appendChild(contributorElement);

        const filterUsers = data.filter(user => user.login === 'Prajwal0225' || user.login === 'madhurafulkar' )

        if(filterUsers.length === 0){
            return "No maintainers in this project"
        }

        const userHTML = filterUsers.map(user => 
          `
          
          <div class="user">
            <img src="${user.avatar_url}" class="avatar" alt="${user.login}"/>
            <h3>${user.login}</h3>
            <p>Contributions: ${user.contributions}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
         </div>
         `
            )
            maintainersContainer.innerHTML = userHTML.join("");
      })
      .catch(error => {
        console.error("Everything is wrong mann...")
      })
    })
})

