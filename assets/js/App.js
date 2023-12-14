import view from "../../view/view.js";

chrome.runtime &&
chrome.runtime.onMessage.addListener(function(request) {
	var data = request.data;
	$.each(data, function(selector, value) {
		$("." + selector).text(value);
	});
});

var permission, matched=true;

const permissions=[
	"scripting",
	"storage",
	"tabs",
	"contextMenus"
];

for(permission in permissions) {
	if (!(permissions[permission] in chrome)) {
		matched=false;
		break;
	}
}

matched && $("#content").html(view);

function runScriptFunction() {
	return [window.innerWidth, window.innerHeight];
}

matched && (async function() {
	const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		function: runScriptFunction
	}, function(injectionResults) {
		const [data]=injectionResults;
		const {result}=data;
		$(".dimenssion").html(result.join("x"));
	});
})();