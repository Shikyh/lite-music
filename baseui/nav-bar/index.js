// baseui/nav-bar/index.js
const globalData = getApp().globalData;

Component({
	options: {
		multipleSlots: true,
	},

	properties: {
		title: {
			type: String,
			value: "标题",
		},
	},
	data: {
		statusBarHeight: globalData.statusBarHeight,
		navBarHeight: globalData.navBarHeight, //顶部导航栏占位高度
	},
	methods: {
		handleLeftClick: function () {
			this.triggerEvent("click");
		},
	},
});
