function pooper(userName, userId, token, message) {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://" + userName +".sarahah.com/Messages/SendMessage",
	  "method": "POST",
	  "headers": {
	    "content-type": "application/x-www-form-urlencoded",
	    "cache-control": "no-cache",
	  },
	  "data": {
	    "__RequestVerificationToken": token,
	    "userid": userId,
	    "text": message
	  }
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
	}
	}, 10);
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
		var userId = $('#RecipientId').val();
		var regex = /__RequestVerificationToken" type="hidden" value="(.+)"/;
		var dom = $("script").get();
		var test = dom[7].innerHTML.match(regex);
		var token = test[1]
		var u = $("html").attr("class").split(" ")[2];
		if (msg.frequency > 0) {
			frequency = msg.frequency;
		} else {
			frequency = 20;
		}

		if (msg.message.length > 0) {
			message = msg.message;
		} else {
			message = "This is to tell you, how shitty your life has become lately!";
		}

		for (i = 0; i < frequency; i++) {
			pooper(u, userId, token, message);
		}
    response("domInfo");
  }
});
