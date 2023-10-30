browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "goBackToCoordinates") {
    console.log(message);
    // 메시지에 포함된 좌표로 스크롤
    window.scrollTo({
      left: message.x,
      top: message.y,
      behavior: 'smooth'
    });
  }
});


// 페이지 클릭 이벤트를 감지하고 저장
document.addEventListener("click", function (event) {
    const clickX = event.clientX;
    const clickY = event.clientY;
    
    browser.runtime.sendMessage({ action: "saveCoordinates", x: clickX, y: clickY });
   
  });
  


