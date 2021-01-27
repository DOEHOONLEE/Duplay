document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: "getDuration" }, function(response) {

            if (response != undefined) {
                // 요청 배열 검사
                if (responseValidator(response.duration)) {
                    
                    // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
                    const total = response.duration[0];
                    const watched = response.duration[1];
                    const percent = response.duration[2];
                    
                    // DOM 에 결과값 넣기
                    document.getElementById("total").innerText = total;
                    document.getElementById("watched").innerText = watched;
                    document.getElementById("percent").innerText = `${Math.floor(percent*100)}% completed`;
                    document.getElementById("progress-bar").style.width = `${Math.floor(percent*94)}%`;

                    // 가림막 없애기
                    document.getElementById("refresh").style.visibility = "hidden";
                }
            }

        });

        shadeCheck.addEventListener("click", function() {
            const shadeCheck = document.querySelector('#shadeCheck');
            chrome.tabs.sendMessage(activeTab.id, { action: "shadeOut", value: shadeCheck.checked })
        })
    })
})

function responseValidator(arr) {
    for (let i=0; i < arr.length; i++) {
        if (String(arr[i]).includes("NaN")) {
            return false;
        }
    }
    return true;
}