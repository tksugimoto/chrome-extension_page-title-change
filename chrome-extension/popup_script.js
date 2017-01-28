
const titleElem = document.getElementById("title");

chrome.tabs.query({
	currentWindow: true,
	active: true
}, ([currentTab]) => {
	titleElem.addEventListener("keyup", evt => {
		if (evt.key === "Enter") {
			const title = evt.target.value;
			chrome.tabs.executeScript(currentTab.id, {
				"file": "/title_change.js"
			}, result => {
				chrome.tabs.sendMessage(currentTab.id, {
					method: "changeTitle",
					newTitle: title
				});
			});
		}
	});

	titleElem.placeholder = currentTab.title;
	chrome.tabs.sendMessage(currentTab.id, {
		method: "getDefaultTitle"
	}, message => {
		if (message && message.defaultTitle) {
			titleElem.placeholder = message.defaultTitle;
		}
	});

	if (titleElem.value !== "") {
		// 既に入力されてたらページタイトルを入れない
		return;
	}
	titleElem.value = currentTab.title;
	titleElem.select();
});
titleElem.focus();
