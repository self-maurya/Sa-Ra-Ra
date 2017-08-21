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
	    "text": message,
			"captchaResponse": "03AJz9lvTferinPvvJVQt8JFUMsAyKP-gnTY3qmMnWKKnQSYnMXTpKAhGGeFeHsCv5xwoMSfLgBuryV858IpInkQ9QSqcj3Da_MTwFNC5kzw_IDPu-SOf6UdOGDxk8VV-A6Pd1kJwpUxK6M96SqlhCOI2ZDJyls-u7unXDLhZC30toqT-ui6AOPLoRSC7nA7cYMh8Hr4Ht76rssqOZIIMWV4Dw88X6AREE2nuvhFsKAQQ9MW8A-Td0hA6bT5QTsKjHphkDYlVAaqMxMZ31OI2K5u6x7YwjlwwyyLwbAf-Pydh-i-pF4tao--IsOIiktwLCdgyXLQUfPk2GV1RewdPyCK74a3bjUIotD7J1Wi9ps8Xy-5aC874Fiv-41snXBqFNY9m3ScczfuxX7y3ViGKNPv8pEhpNUo65Rw"
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
