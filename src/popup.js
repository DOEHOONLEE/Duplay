                // [ 0 ] DOM SELECTION + 필요 변수들 정의 //

const shadeCheck = document.querySelector('#shadeCheck');
const refresh = document.querySelector("#refresh");

                // [ 1 ] 함수 정의 //

function responseValidator(obj) {
    for (let elem in obj) {
        if (obj[elem] === null) {
            return false;
        }
        else {
            if (typeof obj[elem] != "number") {
                if (obj[elem].includes("NaN")) {
                    return false;
                }
            }
        }
    }
    return true;
}

function createThumbnail(thumbnailSrc){
    document.querySelector('#thumbnail').style.backgroundImage = `url(${thumbnailSrc})`;
    document.querySelector('#thumbnail').style.height = "94px";
    document.querySelector('#thumbnail').style.backgroundSize = "contain";
    document.querySelector('body').style.height = '210px';
    document.querySelector('html').style.height = '210px';
}

document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: "getDuration" }, function(response) {

            if (response != undefined) {
                // 요청 배열 검사
                if (responseValidator(response.duration)) {
                    
                    // 객체 데이터 => {총 시간, 시청 시간, 시청 한 시간(퍼센트), 썸네일}
                    // totalDuration, watchedDuration, progress, thumbnailSmall
                    const totalDuration = response.duration.totalDuration;
                    const watchedDuration = response.duration.watchedDuration;
                    const progress = response.duration.progress;
                    const thumbnailSmall = response.duration.thumbnailSmall;
                    
                    // DOM 에 결과값 넣기
                    document.getElementById("total").innerText = totalDuration;
                    document.getElementById("watched").innerText = watchedDuration;
                    document.getElementById("percent").innerText = `${Math.floor(progress*100)}% completed`;
                    document.getElementById("progress-bar").style.width = `${Math.floor(progress*94)}%`;

                    // 가림막 없애기
                    refresh.style.visibility = "hidden";
                    
                    // thumbnail 넣기
                    createThumbnail(thumbnailSmall);
                }
            }
        });

        shadeCheck.addEventListener("click", function() {
            chrome.tabs.sendMessage(activeTab.id, { action: "shadeOut", value: shadeCheck.checked })
        });
    })
})