// contentScript.js

const phrasesToRemove = [
    "\\(Official Video\\)", 
    "\\(Official Music Video\\)", 
    "\\(Lyric Video\\)", 
    "\\(Lyrics\\)", 
    "\\(HD\\)", 
    "\\(HQ\\)", 
    "Official Video", 
    "Official Music Video", 
    "Lyric Video", 
    "Lyrics", 
    "HD", 
    "HQ"
  ];

// Attempt to get the YouTube video title
const titleElement = document.querySelector("#title > h1 > yt-formatted-string");
const songTitle = titleElement ? titleElement.textContent : "Unknown Song";

// Remove any phrases that are in the phrasesToRemove array
phrasesToRemove.forEach((phrase) => {
    const regex = new RegExp(phrase, "gi");
    songTitle = songTitle.replace(regex, "").trim();
  });

// Send the title back to the popup
songTitle;
