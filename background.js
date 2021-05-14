console.log('Hello from background script')

// Forward foreground messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    chrome.tabs.query({}, (tabs) => {
        const tab_id = tabs.filter(el => el.url.includes(request.to))?.[0]?.id
        console.log('Forwarding', request, tabs, tab_id, sender);
        chrome.tabs.executeScript(tab_id, {code: request.script}, function (results) {})
    })

    // chrome.tabs.sendMessage(request.to, request.script, function (response) {
    //     console.log("bgs: forwarded " + response.script + " to the caller " + sender.tab.id);
    //     sendResponse(response);
    // });
});

// // Inject foreground stub
// const inject_stub = (tab) => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         console.log(current_tab_info.url)
//         if (/^https:/.test(current_tab_info.url)) {
//             chrome.tabs.executeScript(null, {code: `
//             document.getElementById('passmyjs_trigger').addEventListener(')
//             document.getElementById('passmyjs_payload')
//             `},
//                 () => console.log(`Injected stub into tab ${current_tab_info.url}`))
//         }
//     })
// }

// chrome.tabs.onActivated.addListener(tab => inject_stub(tab))