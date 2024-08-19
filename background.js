chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('leetcode.com/progress')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } else {
    alert("Please navigate to https://leetcode.com/progress");
  }
});
