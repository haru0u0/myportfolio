const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();

window.addEventListener("load", async function () {
  xhr.open("POST", "https://accounts.spotify.com/api/token");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "grant_type=client_credentials&client_id=80c482156df74fb79fe88a0b347597b2&client_secret=bb75cd6fab8a49f3baed2955c5898734"
  );
  xhr.responseType = "json";
});

xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    //get access token
    const res_initial = xhr.response;
    //request on-repeat playlist with the access token
    xhr2.open(
      "GET",
      "https://api.spotify.com/v1/playlists/3BUb4P8KXbD6UHBxqIkimQ?fields=tracks.items%28track%28album.images.url%2C+artists.name%2C+name%2Cpreview_url%29"
    );
    xhr2.setRequestHeader(
      "Authorization",
      "Bearer " + res_initial.access_token
    );
    xhr2.send();
    xhr2.responseType = "json";
    xhr2.onload = () => {
      if (xhr2.readyState == 4 && xhr2.status == 200) {
        display(xhr2.response);
      } else {
        var songs = document.querySelectorAll(".song");
        var song_indx = 0;
        while (song_indx < songs.length) {
          var song_name = songs[song_indx].querySelector(".song-name");
          song_name.innerHTML = "Hmm, looks like there is a connection error!";
          song_indx++;
        }
        console.log(`Error: ${xhr2.status}`);
      }
    };
  } else {
    console.log(`Error: ${xhr.status}`);
    var songs = document.querySelectorAll(".song");
    var song_indx = 0;
    while (song_indx < songs.length) {
      var song_name = songs[song_indx].querySelector(".song-name");
      song_name.innerHTML = "Hmm, looks like there is a connection error!";
      song_indx++;
    }
  }
};

function display(data) {
  //text
  var songs = document.querySelectorAll(".song");
  var song_indx = 0;

  while (song_indx < songs.length) {
    //name
    var song_name = songs[song_indx].querySelector(".song-name");
    song_name.innerHTML = data.tracks.items[song_indx].track.name;
    //artist
    var artist_name = songs[song_indx].querySelector(".artist-name");
    artist_name.innerHTML = data.tracks.items[song_indx].track.artists[0].name;
    //thumnail
    var thm = songs[song_indx].querySelector("img");
    thm.setAttribute(
      "src",
      data.tracks.items[song_indx].track.album.images[0].url
    );
    //button
    var music_button = songs[song_indx].querySelector(".music-button");
    var mp3;
    music_button.addEventListener("click", function () {
      var play_button = this.querySelector(".fa-circle-play");
      var pause_button = this.querySelector(".fa-circle-pause");

      if (play_button.classList.contains("hidden")) {
        mp3.pause();
      } else {
        mp3 = new Audio(
          data.tracks.items[
            Array.from(songs).indexOf(this.closest(".song"))
          ].track.preview_url
        );
        mp3.play();
      }
      play_button.classList.toggle("hidden");
      pause_button.classList.toggle("hidden");
    });
    song_indx++;
  }

  var songs1 = document.querySelector("#songs1");
  var songs2 = document.querySelector("#songs2");

  songs1.addEventListener("mouseover", function () {
    songs1.style.animationPlayState = "paused";
    songs2.style.animationPlayState = "paused";
  });

  songs2.addEventListener("mouseover", function () {
    songs1.style.animationPlayState = "paused";
    songs2.style.animationPlayState = "paused";
  });

  songs1.addEventListener("mouseout", function () {
    songs1.style.animationPlayState = "";
    songs2.style.animationPlayState = "";
  });

  songs2.addEventListener("mouseout", function () {
    songs1.style.animationPlayState = "";
    songs2.style.animationPlayState = "";
  });
}
