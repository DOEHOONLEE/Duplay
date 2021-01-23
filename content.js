chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    const playlistContainer = document.querySelectorAll(".ytd-thumbnail-overlay-time-status-renderer");
    let videoDurations = [];
    let totalDuration = 0;
    let watchedDuration = 0;
    
    for (let i=0; i < playlistContainer.length; i++) {
        if (playlistContainer[i].tagName === "SPAN") {
        videoDurations.push(playlistContainer[i].innerHTML.trim());
        }
    }
    
    videoDurations.forEach(c => {
        let durationSplit = c.split(":").map(c => Number(c));
        
        durationSplit.forEach((cv, idx) => totalDuration += (60 ** (durationSplit.length - idx - 1)) * cv)
    });

    // 시청한 비디오 시간 계산
    function checkWatched() {
        document.querySelectorAll("#progress").forEach(eachVideo => {
            const HMS = eachVideo.parentNode.parentNode.children[2].innerText;
            const percentile = eachVideo.style.width;

            // 현재 비디오 시간의 퍼센트 계산 후 시청한 시간에 더하기
                // 현재 비디오 길이
            const currentDuration = HMStoSecond(HMS)
                // 시청한 퍼센트 숫자로 변환
            const percentToNum = Number(percentile.match(/\d+/g)[0]);
                // 현재 비디오 시청 길이
            const watchedCurrent = Math.floor((currentDuration * percentToNum) / 100);

            // 총 시청 시간에 더하기
            watchedDuration += watchedCurrent;
        });
    }

    // HMS 를 초단위로 변환
        // HMS 파라미터 = HH:MM:SS 형식의 문자열
    function HMStoSecond(HMS) {
    }

    // 초를 HMS 로 변환
    function secToDisplayFormat(second) {
        let hour = Math.floor(second / 3600);
        let min = Math.floor(second % 3600 / 60);
        let sec = Math.floor(second % 3600 % 60);
        
        return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
    }
    
    // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
    const result = [secToDisplayFormat(totalDuration), secToDisplayFormat(watchedDuration), Math.floor(watchedDuration / totalDuration * 100)];
    
    if (request.action == "getDOM") {
        sendResponse({dom: result});
    }
    else {
        sendResponse({}); // Send nothing..
    }
});