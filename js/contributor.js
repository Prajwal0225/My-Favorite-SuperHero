document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container");
  const contributorsContainer = document.querySelector(".contributors");
  const maintainersContainer = document.querySelector(".maintainers");
  const loading = document.querySelector(".loading");
  try {
    let maintainers = ["Prajwal0225", "madhurafulkar"];
    let result = await fetch(
      "https://api.github.com/repos/Prajwal0225/My-Favorite-SuperHero/contributors",
    );
    result = await result.json();
    result.forEach((data) => {
      let node = makeElementProfile(data);
      if (maintainers.includes(data.login)) {
        maintainersContainer.appendChild(node);
      } else {
        contributorsContainer.appendChild(node);
      }
    });
    setTimeout(() => {
      loading.remove();
      container.style.display = "block";
    }, 1000);
  } catch (err) {
    console.error(err.message);
    loading.innerHTML = `<p>${err.message}</p>`;
  }
});

/**
 * @return HTMLDivElement
 */
function makeElementProfile(data) {
  let root = document.createElement("div");
  let avatar = document.createElement("img");
  let userLink = document.createElement("a");
  let userName = document.createElement("h3");
  let userContributions = document.createElement("p");

  root.classList.add("contributor");
  avatar.classList.add("avatar");

  avatar.src = data.avatar_url;
  avatar.alt = `${data.login}'s avatar`;
  userName.textContent = data.login;
  userLink.href = data.html_url;
  userLink.target = "_blank";
  userLink.textContent = "Check Profile";
  userContributions.textContent = `Contributions: ${data.contributions}`;

  root.appendChild(avatar);
  root.appendChild(userName);
  root.appendChild(userContributions);
  root.appendChild(userLink);
  return root;
}
