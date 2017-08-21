function setDOMInfo(info) {
  console.log(info)
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("senderButton").onclick = function () {
      message = document.getElementById("message").value;
      frequency = document.getElementById("frequency").value;
      console.log(frequency);
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
              from: 'popup',
              subject: 'DOMInfo',
              message: message,
              frequency: parseInt(frequency)
            },
            setDOMInfo
          );
      });
   };
});
