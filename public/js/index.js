window.onload = () => {
  const searchResultEl = document.querySelector("#search-results");
  const searchParams = new URLSearchParams(window.location.search);
  const spotifyEmbed = new SpotifyEmbed({
    parentEl: document.querySelector("#spotify-embed")
  });
  const songSearch = searchParams.get("song");
  console.log(window.location.search);
  let item;
  if (songSearch) {
    fetchSongSearch();
  }
  searchResultEl.addEventListener("click", e => {
    if (e.target.matches(".btn-listen")) {
      const data = e.target.dataset;
      const artist = data.artist;
      const title = data.title;
      getlyrics(artist, title);
      return spotifyEmbed.src(spotifyEmbedUrl(item.uri));
    }
  });
  searchResultEl.addEventListener("click", e => {
    if (e.target.matches(".save-btn")) {
      const song = e.target.dataset;

      const saveSong = {
        artist: song.artist,
        songTitle: song.title
      };
      $.ajax("/api/history", {
        type: "POST",
        data: saveSong
      }).then(() => {
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });
  function getlyrics(artist, title) {
    const lyricq = `/api/lyrics?title=${title}&artist=${artist}`;
    console.log(lyricq);
    fetch(lyricq)
      .then(response => response.json())
      .then(data => {
        const lyrics = data;
        $("#lyrics").text(lyrics);
      });
  }
  function spotifyEmbedUrl(songUri) {
    const [type, id] = songUri.split(":").slice(1);
    return `https://open.spotify.com/embed/${type}/${id}`;
  }
  async function fetchSongSearch() {
    try {
      const response = await fetch(`/api/search/songs?song=${songSearch}`);
      if (response.ok) {
        item = await response.json();
        item = item.items[0];
        renderSongs(item);
      } else {
        console.log("http error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderSongs(song) {
    const { name, uri, artists, external_urls } = song;
    const artistText = artists[0].name;
    const spotifyUrl = external_urls.spotify;

    const el = document.createElement("div");
    el.classList.add("mb-3");
    el.innerHTML = `
        <h3>${name}</h3>
        <p>${songDetails({ artistText, spotifyUrl })}</p>
        <button class="btn btn-secondary btn-listen" data-artist="${artistText}"data-title="${name}">Listen</button>
        <button class="btn btn-secondary save-btn" data-artist="${artistText}"data-title="${name}">Save Song</button>
      `;
    searchResultEl.appendChild(el);

    function songDetails({ artistText, spotifyUrl }) {
      return [
        ["artist", artistText],
        ["url", `<a href="${spotifyUrl}">${spotifyUrl}</a>`]
      ]
        .map(row => row.join(": "))
        .join("<br>");
    }
  }
};
