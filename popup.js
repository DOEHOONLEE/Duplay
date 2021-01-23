chrome.tabs.getSelected(null, function(tab) {
    // Send a request to the content script.
    chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
        console.log(response.dom);

        // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
        const total = response.dom[0];
        // const watched = response.dom[1];
        // const percent = response.dom[2];

        // DOM 에 결과값 넣기
        document.getElementById("total").innerHTML = `<strong>Total Duration</strong> ${total}`;
        // document.getElementById("watched").innerHTML = watched;
        // document.getElementById("percent").innerHTML = percent;
        document.getElementById("progress-bar").style.width = "25%";
    });
});