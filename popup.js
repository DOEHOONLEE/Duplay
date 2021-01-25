chrome.tabs.getSelected(null, function(tab) {
    // Send a request to the content script.
    chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
        console.log(response.dom);

        // 배열 결과 값 => [총 시간, 시청 시간, 시청 한 시간 (퍼센트)]
        const total = response.dom[0];
        const watched = response.dom[1];
        const percent = response.dom[2];

        // DOM 에 결과값 넣기
        document.getElementById("total").innerHTML = total;
        document.getElementById("watched").innerHTML = watched;
        document.getElementById("percent").innerHTML = `<strong>${Math.floor(percent*100)}% completed</strong>`;
        document.getElementById("progress-bar").style.width = `${Math.floor(percent*94)}%`;
    });

    const shadeCheck = document.querySelector('#shadeCheck');
    shadeCheck.addEventListener('click',function(){
        chrome.tabs.sendRequest(tab.id, {action: "click", msg: shadeCheck.checked}, function(response) {
            console.log('성공');
        })
    })
})