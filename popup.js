// popup.js

function getWebsiteForTab(url, songTitle) {
    return `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(songTitle)}`;
  }
  
  document.getElementById("open-link").addEventListener("click", () => {
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
          const urlToOpen = getWebsiteForTab(activeTab.url, songTitle);
          chrome.tabs.create({ url: urlToOpen });
        }
      );
    });
  });
  