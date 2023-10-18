document.addEventListener("DOMContentLoaded", () => {
  const apiPath = "https://superheroapi.com/api.php/136899909020706";
  const rootInfo = document.querySelector("#info");
  const dataInfo = rootInfo.querySelector("div:nth-child(2)");
  const searchInput = rootInfo.querySelector("input");
  const resultsImg = document.querySelector("#results img");

  const btn = {
    random: document.querySelector("#random-hero"),
    find: document.querySelector("#find"),
    download: document.querySelector("#download-hero"),
  };
  const finder = {
    el: document.querySelector("#find-results"),
    setEmpty() {
      return (this.el.textContent = "");
    },
    isOpen() {
      return this.el.classList.contains("open");
    },
    close() {
      return this.el.classList.remove("open");
    },
    toggle() {
      return this.el.classList.toggle("open");
    },
    addItem(node) {
      return this.el.appendChild(node);
    },
  };
  /**
   * event listener in here
   */
  searchInput.addEventListener("focus", function () {
    searchInput.placeholder = "";
  });
  searchInput.addEventListener("blur", function () {
    searchInput.placeholder = "Find Your Hero";
  });
  searchInput.addEventListener("keyup", async (e) => {
    try {
      const value = searchInput.value.trim();
      if (e.keyCode === 13) {
        if (!value) throw Error("Input is required");
        await getSuperHero(value, true);
        if (finder.isOpen()) return;
        finder.toggle();
      }
    } catch (err) {
      showError(err.message);
    }
  });
  btn.random.addEventListener("click", () =>
    getSuperHero(Math.floor(Math.random() * 731) + 1),
  );
  btn.find.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value) return getSuperHero(searchInput.value, true);
  });
  btn.download.addEventListener("click", () => {
    const src = resultsImg.getAttribute("src");
    if (!src) return;
    downloadImage(src);
  });

  /**
   * create node for information heroes
   */
  function createPreviewHero(response) {
    // reset data info
    dataInfo.textContent = "";

    const data = [
      { text: "Aliases", value: response.name },
      { text: "Strength", value: response.powerstats.strength },
      { text: "Speed", value: response.powerstats.speed },
      { text: "Gender", value: response.appearance.gender },
      { text: "Place of Birth", value: response.biography["place-of-birth"] },
      {
        text: "First Appearance",
        value: response.biography["first-appearance"],
      },
    ];
    for (const value of data) {
      let root = document.createElement("div");
      let h2 = document.createElement("h2");
      let p = document.createElement("p");

      h2.textContent = value.text;
      p.textContent = value.value || "-";

      root.appendChild(h2);
      root.appendChild(p);
      dataInfo.appendChild(root);
    }
    resultsImg.setAttribute("src", response.image.url);
  }
  /**
   * create row results for '#find-results'
   */
  function createRowResults(item, isFind) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const i = document.createElement("i");

    p.textContent = item.name;
    i.classList.add("fa-solid", "fa-arrow-right");

    div.appendChild(p);
    div.appendChild(i);
    div.addEventListener("click", () => {
      createPreviewHero(item, isFind);
      finder.close();
    });
    return div;
  }
  /**
   * fetching api heroes, then create node
   */
  async function getSuperHero(id, isFind = false) {
    try {
      let url = isFind ? `${apiPath}/search/${id}` : `${apiPath}/${id}`;
      let response = await fetch(url);
      response = await response.json();
      if (
        !response ||
        (isFind && (!response.results || !response.results.length))
      )
        throw Error(`The superhero does not exist on the website`);
      if (isFind && response.results && response.results.length) {
        finder.setEmpty();

        if (response.results.length > 1) {
          const equal = response.results.find(
            (result) => result.name === searchInput.value.trim(),
          );
          if (equal) response = equal;
          else {
            for (const item of response.results) {
              finder.addItem(createRowResults(item, isFind));
            }
            return;
          }
        } else {
          response = response.results[0];
        }
      }
      createPreviewHero(response, isFind);
      finder.close();
    } catch (err) {
      showError(err.message);
    }
  }
  /**
   * download the image hero
   * @param url string
   */
  function downloadImage(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /**
   * show error to dom
   * @param message string
   */
  function showError(message) {
    const errorEl = document.querySelector("#info .errors");
    errorEl.textContent = message;
    errorEl.classList.add("open");
    setTimeout(() => {
      errorEl.classList.remove("open");
    }, 5000);
  }
});
