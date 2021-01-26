document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: "getDuration" }, function(response) {

            // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
            const total = response.duration[0];
            const watched = response.duration[1];
            const percent = response.duration[2];

            // DOM 에 결과값 넣기
            document.getElementById("total").innerHTML = total;
            document.getElementById("watched").innerHTML = watched;
            document.getElementById("percent").innerHTML = `<strong>${Math.floor(percent*100)}% completed</strong>`;
            document.getElementById("progress-bar").style.width = `${Math.floor(percent*94)}%`;
        });

        shadeCheck.addEventListener("click", function() {
            const shadeCheck = document.querySelector('#shadeCheck');
            chrome.tabs.sendMessage(activeTab.id, { action: "shadeOut", value: shadeCheck.checked })
        })
    })
})