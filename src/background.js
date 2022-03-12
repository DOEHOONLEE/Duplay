function refresh(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    const action = request.action;
    switch (action){
        case "REFRESH": refresh();
            break;
    }
})