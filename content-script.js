let debugLayout = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.action){
    case 'getTitle':
      sendResponse({title:document.title});
      break;
    case 'getDebugLayout':
      sendResponse({debugLayout:debugLayout});
      break;
    case 'setDebugLayout':
      debugLayout = request.value;
      if (!debugLayout) tooltip.remove();
      sendResponse({debugLayout:debugLayout});
      break;
  }
  
});

const tooltip = document.createElement("div");
tooltip.style.cssText = `
min-width:100px;
min-height:100px;
margin-top:-120px;
background:white !important;
position:fixed;
color:black !important;
padding:5px;
border-radius:5px;
border:1px solid #999999 !important;
outline:none !important;
font-size:12px !important;
font-weight:normal !important;
z-index:99999;
`;
  


document.addEventListener('mouseover', (e) => {
  const t = e.target;
  if (debugLayout && t !== tooltip){
    let classList = '';
    t.classList.forEach(c=>classList+='.'+c);
    tooltip.innerHTML = `
    ${t.tagName.toLowerCase()}${classList}<br>
    width:${t.offsetWidth}px<br>
    height:${t.offsetHeight}px
    <br>position:${t.style.position || 'static'}`;
    t.prepend(tooltip);
  }
  

});