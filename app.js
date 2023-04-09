function renderEpisodesList(episodesList, episodesContainer) {
  const ul = document.createElement("ul");
  ul.classList.add("episodes-list");

  const episodesCharacters = []; // Using for throwing the characters array

  const listItems = episodesList
    .sort(({ episodeId: a }, { episodeId: b }) => a - b)
    .map(({ episodeId, name, openingCrawl, characters }) => {
      episodesCharacters.push({ episodeId, characters });

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

  return episodesCharacters;
}

function renderEpisodeCharacters({ episodeId, characters }) {
  const episodeLi = document.querySelector(`.episode-${episodeId}`);
  const episodeCharacters = document.createElement("p");

  characters.forEach((url) =>
    fetch(url)
      .then((response) => response.json())
      .then((data) => episodeCharacters.append(data.name + ", "))
  );

  episodeLi.append(episodeCharacters);
}

const loadBtn = document.querySelector("#load-btn");
const episodesSection = document.querySelector(".episodes");

loadBtn.addEventListener("click", (event) => {
  fetch("https://ajax.test-danit.com/api/swapi/films")
    .then((response) => response.json())
    .then((data) => renderEpisodesList(data, episodesSection))
    .then((characters) => characters.forEach(renderEpisodeCharacters));
});
