const titleElt = document.getElementById('title');

async function getCurrentTab(){
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  return tab;
}

let debugLayout = false;
let tab;
(async () => {
  tab = await getCurrentTab();
  chrome.tabs.sendMessage(tab.id, {action:'getTitle'}, function(response) {
    if (response.title)
      titleElt.innerHTML = response.title;
  });

  chrome.tabs.sendMessage(tab.id, {action:'getDebugLayout'}, function(response) {
    if (response.debugLayout)
    debugLayout = response.debugLayout;
  });
})();

document.getElementById('btn_debug_layout').addEventListener('click', async () => {
  let method = debugLayout ? 'removeCSS' : 'insertCSS';
  debugLayout = !debugLayout;
  chrome.scripting[method]({
    files:['debug_layout.css'],
    target:{
      allFrames:true,
      tabId:tab.id
    }
  });

  chrome.tabs.sendMessage(tab.id, {action:'setDebugLayout', value:debugLayout});
});


