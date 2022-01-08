export default function stringToNodes(keyword, value) {
	const nodes = [];
	if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
		const startKey = keyword.slice(0, value.length);
		const startNode = {
			name: "span",
			attrs: { style: "color: #26ce8a; font-size: 14px;" },
			children: [{ type: "text", text: startKey }],
		};
		nodes.push(startNode);
		const endKey = keyword.slice(value.length);
		const endNode = {
			name: "span",
			attrs: { style: "color: #000000; font-size: 14px;" },
			children: [{ type: "text", text: endKey }],
		};
		nodes.push(endNode);
	} else {
		const node = {
			name: "span",
			attrs: { style: "color: #000000; font-size: 14px;" },
			children: [{ type: "text", text: keyword }],
		};
		nodes.push(node);
	}
	return nodes;
}
