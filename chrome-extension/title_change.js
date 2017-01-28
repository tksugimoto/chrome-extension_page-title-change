if (typeof window.defaultTitle === "undefined") {
	window.defaultTitle = document.title;
	chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
		if (message.method === "changeTitle") {
			const newTitle = message.newTitle;
			document.title = newTitle || defaultTitle;
		} else if (message.method === "getDefaultTitle") {
			sendResponse({
				defaultTitle
			});
		}
	});
}
