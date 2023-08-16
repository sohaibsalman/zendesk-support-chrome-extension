chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "customAction") {
    console.log("Request", request);
    chrome.storage.local.set({ access_token: request.token });
  }
});
