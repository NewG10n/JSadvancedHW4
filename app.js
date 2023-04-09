const loadBtn = document.querySelector("#load-btn");
const episodesSection = document.querySelector(".episodes");

loadBtn.addEventListener("click", (event) => {
  fetch("https://ajax.test-danit.com/api/swapi/films")
    .then((response) => response.json())
    .then((data) => {
      renderEpisodesList(data, episodesSection);
      console.log(data);
    });
});

function renderEpisodesList(episodesList, episodesContainer) {
  const ul = document.createElement("ul");

  const listItems = episodesList
    .sort(({ episodeId: a }, { episodeId: b }) => a - b)
    .map(({ episodeId, name, openingCrawl }) => {
      const li = document.createElement("li");

      const header = document.createElement("h2");
      header.innerText = `Episode ${episodeId}: ${name}`;

      const description = document.createElement("p");
      description.innerText = openingCrawl;

      li.append(header, description);

      return li;
    });

  ul.append(...listItems);
  episodesContainer.append(ul);
}
