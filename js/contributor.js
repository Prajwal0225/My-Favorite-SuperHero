
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".contributors");
  const maintainersContainer = document.querySelector(".maintainers");
  
  try {
    let maintainers = ["Prajwal0225", "madhurafulkar"];
    let result = await fetch("https://api.github.com/repos/Prajwal0225/My-Favorite-SuperHero/contributors");
    result = await result.json();
    result.forEach((data) => {
      let node = makeCardProfile(data);
      if (maintainers.includes(data.login)) {
        maintainersContainer.appendChild(node);
      } else {
        container.appendChild(node);
      }
    })
  } catch(err) {
    console.error(err.message)
  }
});

/**
 * @return HTMLDivElement
 */
function makeCardProfile(data) {
  let root = document.createElement("div");
  let avatar = document.createElement("img");
  let userLink = document.createElement("a");
  let userName = document.createElement("h3");
  let userContributions = document.createElement("p");

  // root
  root.classList.add("contributor");
  avatar.classList.add("avatar");

  avatar.src = data.avatar_url;
  avatar.alt = `${data.login}'s avatar`;
  userName.textContent = data.login;
  userLink.href = data.html_url;
  userLink.target = "_blank";
  userLink.textContent = "Profile";
  userContributions.textContent = `Contributions: ${data.contributions}`;

  root.appendChild(avatar);
  root.appendChild(userName);
  root.appendChild(userLink);
  root.appendChild(userContributions);
  return root;
}