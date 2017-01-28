if (typeof window.defaultTitle === "undefined") {
	window.defaultTitle = document.title;
	chrome.runtime.onMessage.addListener(message => {
		const newTitle = message.newTitle;
		document.title = newTitle || defaultTitle;
	});
}
