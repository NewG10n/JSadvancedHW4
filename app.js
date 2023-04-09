function getEpisodesData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}

function renderEpisodesList(episodesList, episodesContainer) {
  episodesContainer.classList.remove("loader");

  const ul = document.createElement("ul");
  ul.classList.add("episodes-list");

  const listItems = episodesList
    .sort(({ episodeId: a }, { episodeId: b }) => a - b)
    .map(({ episodeId, name, openingCrawl }) => {
      const li = document.createElement("li");

      const header = document.createElement("h2");
      header.innerText = `Episode ${episodeId}: ${name}`;

      const description = document.createElement("p");
      description.innerText = openingCrawl;

      li.classList.add(`episode-${episodeId}`);
      li.append(header, description);

      return li;
    });

  ul.append(...listItems);
  episodesContainer.append(ul);
}

function renderEpisodeCharacters({ episodeId, characters }) {
  const episodeLi = document.querySelector(`.episode-${episodeId}`);
  const episodeCharacters = document.createElement("p");
  episodeCharacters.classList.add("loader");
  episodeLi.append(episodeCharacters);

  Promise.all(
    characters.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => data.name)
    )
  ).then((values) => {
    episodeCharacters.classList.remove("loader");
    episodeCharacters.innerText = "Characters: " + values.join(", ");
  });
}

function errorHandler(error, element) {
  element.classList.remove("loader");
  element.innerText = error.message;
}

const loadBtn = document.querySelector("#load-btn");

loadBtn.addEventListener("click", (event) => {
  loadBtn.disabled = true;
  const episodesSection = document.querySelector(".episodes");
  episodesSection.classList.add("loader");

  getEpisodesData("https://ajax.test-danit.com/api/swapi/films")
    .then((data) => {
      renderEpisodesList(data, episodesSection);
      return data;
    })
    .then((data) => data.forEach(renderEpisodeCharacters))
    .catch((e) => {
      errorHandler(e, episodesSection);
      loadBtn.disabled = false;
    });
});
