$(document).on("mousemove", function(event) {
	const e = event.originalEvent;
	var data={}, includes=[
		"screen",
		"offset",
		"client",
		"layer",
		"movement"
	];
	$.each(includes, function(_i, value) {
		data[value]=e[value+"X"]+"x"+e[value+"Y"];
	});
	chrome.runtime.sendMessage({data});
});