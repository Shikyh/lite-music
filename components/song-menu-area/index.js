// components/song-menu-area/index.js
const app = getApp();

Component({
	properties: {
		title: {
			type: String,
			value: "默认歌单",
		},
		songMenu: {
			type: Array,
			value: [],
		},
	},

	data: {
		screenWidth: app.globalData.screenWidth,
	},

	methods: {
		handleMenuItemClick: function (event) {
			const item = event.currentTarget.dataset.item;
			wx.navigateTo({
				url: `/packageDetail/pages/detail-songs/index?id=${item.id}&type=menu`,
			});
		},
		songsHeaderClick: function () {
			wx.navigateTo({ url: "/packageDetail/pages/detail-menu/index" });
		},
	},
});
