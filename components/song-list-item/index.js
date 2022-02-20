// components/song-list-item/index.js
Component({
	properties: {
		itemInfo: {
			type: Object,
		},
	},
	data: {},

	methods: {
		songItemClick(event) {
			const id = this.properties.itemInfo.id;
			wx.navigateTo({
				url: "/pages/detail-song/index?type=menu&id=" + id,
			});
		},
	},
});
