// 백그라운드 스크립트 (background.js)

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveCoordinates") {
      // 좌표 저장 로직
      console.log(message)
      const { x, y } = message;
      browser.storage.local.set({ savedX: x, savedY: y }).then(() => {
        console.log(`좌표가 저장되었습니다: X=${x}, Y=${y}`);
      }).catch((error) => {
        console.error(`좌표 저장 중 오류 발생: ${error}`);
      });
    }

    else if (message.action === "goBackToCoordinates") {
      // 현재 활성 탭에 메시지 전송
      browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        if (tabs[0]) {
          browser.tabs.sendMessage(tabs[0].id, message).then(response => {
            console.log(`메시지 전송 성공: ${response}`);
          }).catch(error => {
            console.error(`메시지 전송 실패: ${error.message}`);
          })
        }
      }).catch(console.error);
    }
  });
  
