// popup.js

function getWebsiteForTabUltimateGuitar(url, songTitle) {
    return `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(songTitle)}`;
  }

function getWebsiteForTabSongsterr(url, songTitle) {
  return `https://www.songsterr.com/?pattern=${encodeURIComponent(songTitle)}`;
}
  
  document.getElementById("open-ultimate-guitar").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
  
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          func: () => {
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
            const titleElement = document.querySelector("#title > h1 > yt-formatted-string");
            let songTitle = titleElement ? titleElement.textContent : "Unknown Song";
            phrasesToRemove.forEach((phrase) => {
              const regex = new RegExp(phrase, "gi");
              songTitle = songTitle.replace(regex, "").trim();
            });
            return songTitle;
          },
        },
        (results) => {
          const songTitle = results[0].result;
          const urlToOpen = getWebsiteForTabUltimateGuitar(activeTab.url, songTitle);
          chrome.tabs.create({ url: urlToOpen });
        }
      );
    });
  });
  

  document.getElementById("open-songsterr").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
  
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          func: () => {
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
            const titleElement = document.querySelector("#title > h1 > yt-formatted-string");
            let songTitle = titleElement ? titleElement.textContent : "Unknown Song";
            phrasesToRemove.forEach((phrase) => {
              const regex = new RegExp(phrase, "gi");
              songTitle = songTitle.replace(regex, "").trim();
            });
            return songTitle;
          },
        },
        (results) => {
          const songTitle = results[0].result;
          const urlToOpen = getWebsiteForTabSongsterr(activeTab.url, songTitle);
          chrome.tabs.create({ url: urlToOpen });
        }
      );
    });
  });