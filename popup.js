chrome.tabs.getSelected(null, function(tab) {
    // Send a request to the content script.
    chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
        console.log(response.dom);
        document.getElementById("header").innerHTML = `Total Duration ${response.dom}`;

    });
});