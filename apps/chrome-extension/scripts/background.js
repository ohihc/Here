chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "here-tldr",
    title: "Generate Summary ✨",
    type: "normal",
    contexts: ["selection"],
  });
});

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item, currentTab) => {
  let targetId = null;
  const params = {
    question: { text: item.selectionText },
    result: null,
    context: currentTab.url,
    mode: 'summary'
  };
  chrome.storage.local.set({ params });
  const tab = await chrome.tabs.create({ url: "apps/chat/index.html" });
  targetId = tab.id;
});
