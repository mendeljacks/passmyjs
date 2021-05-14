console.log('I am a stub')

// Mesages from DOM go to bacground
window.addEventListener("message", (event) => {
    // Only accept messages from the same frame
    if (event.source !== window) {
        return;
    }
 
    var message = event.data;
 
    // Only accept messages that we know are ours
    if (message?.topic !== 'passmyjs') {
        return;
    }

    chrome.runtime.sendMessage({
        to: message.to,
        script: message.payload
    }, function (response) {
        // console.log("I got a response", JSON.stringify(response));
    });
});
