chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    const playlistContainer = document.querySelectorAll(".ytd-thumbnail-overlay-time-status-renderer");
    let videoDurations = [];
    let totalDuration = 0;
    
    for (let i=0; i < playlistContainer.length; i++) {
        if (playlistContainer[i].tagName === "SPAN") {
        videoDurations.push(playlistContainer[i].innerHTML.trim());
        }
    }
    
    videoDurations.forEach(c => {
        let durationSplit = c.split(":").map(c => Number(c));
        
        durationSplit.forEach((cv, idx) => totalDuration += (60 ** (durationSplit.length - idx - 1)) * cv)
    });
    
    function secToDisplayFormat(second) {
        let hour = Math.floor(second / 3600);
        let min = Math.floor(second % 3600 / 60);
        let sec = Math.floor(second % 3600 % 60);
        
        return `${hour < 10 ? "0" + hour : hour} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
    }
    
    let hitwo = document.getElementById('contents');
    let hello = document.querySelectorAll('span');
    let hellotwo = document.querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer');
    
    const playlistDurationResult = secToDisplayFormat(totalDuration);
    
    if (request.action == "getDOM") {
        sendResponse({dom: playlistDurationResult});
    }
    else {
        sendResponse({}); // Send nothing..
    }
});