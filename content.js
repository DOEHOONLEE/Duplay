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

    // 각 비디오의 퍼센트와 길이 가져오기
    function checkWatched() {
        document.querySelectorAll("#progress").forEach(eachPercent => {

        });
    }

    // HMS 를 초단위로 변환
    function HMStoSecond() {

    }

    // 초를 HMS 로 변환
    function secToDisplayFormat(second) {
        let hour = Math.floor(second / 3600);
        let min = Math.floor(second % 3600 / 60);
        let sec = Math.floor(second % 3600 % 60);
        
        return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
    }
    
    const playlistDurationResult = secToDisplayFormat(totalDuration);
    const hi = 100;

    const arr = [playlistDurationResult, 100];
    
    if (request.action == "getDOM") {
        sendResponse({dom: arr});
    }
    else {
        sendResponse({}); // Send nothing..
    }
});