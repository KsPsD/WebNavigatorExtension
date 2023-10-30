document.addEventListener('DOMContentLoaded', function() {
    // 저장된 좌표 가져오기
    browser.storage.local.get(["savedX", "savedY"]).then((result) => {
      const savedX = result.savedX;
      const savedY = result.savedY;
      const savedCoordinatesElement = document.getElementById("savedCoordinates");
      
      if (savedX !== undefined && savedY !== undefined) {
        savedCoordinatesElement.textContent = `마우스 클릭 좌표: X=${savedX}, Y=${savedY}`;
      } else {
        savedCoordinatesElement.textContent = "저장된 좌표가 없습니다.";
      }
    }).catch((error) => {
      console.error(`Error fetching coordinates: ${error}`);
    });
  
    // "돌아가기" 버튼에 이벤트 리스너 추가
    const goBackButton = document.getElementById('goBackButton');
  if (goBackButton) {
    goBackButton.addEventListener('click', function() {
      // 저장된 좌표 가져오기
      browser.storage.local.get(["savedX", "savedY"]).then((result) => {
        const savedX = result.savedX;
        const savedY = result.savedY;
        if (savedX !== undefined && savedY !== undefined) {
          // 백그라운드 스크립트에 메시지 전송

          browser.runtime.sendMessage({
            action: "goBackToCoordinates",
            x: savedX,
            y: savedY
          }).then(response => {
          }).catch(error => {
            console.error(`Message send failed: ${error.message}`);
          });
        }
      }).catch(console.error);
    });
  }
    
  });
  