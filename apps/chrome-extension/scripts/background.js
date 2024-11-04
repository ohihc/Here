chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "here-tldr",
    title: "✨ Generate summary",
    type: "normal",
    contexts: ["selection"],
  });
});

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item) => {
  //   const tld = item.menuItemId;
  //   const url = new URL(`https://google.${tld}/search`);
  //   url.searchParams.set("q", item.selectionText);
  //   chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  // console.log("=== contextMenus.onClicked ===", { item, tab, far });
  let targetId = null;
  const tab = await chrome.tabs.create({ url: "apps/chat/index.html" });
  targetId = tab.id;

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (tabId != targetId || changedProps.status != "complete") return;
    chrome.tabs.onUpdated.removeListener(listener);
    chrome.tabs.sendMessage(tabId, { msg: "message", data: item });
  });
});
