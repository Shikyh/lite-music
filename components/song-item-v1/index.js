// components/song-item-v1/index.js
import { playerStore } from "../../store/index";

Component({
	properties: {
		item: {
			type: Object,
			value: {},
		},
	},

	data: {},
	methods: {
		handleSongItemClick: function () {
			const id = this.properties.item.id;
			// 1.页面跳转
			wx.navigateTo({
				url: "/packagePlayer/pages/music-player/index?id=" + id,
			});
			// 2.对歌曲的数据请求和其他操作
			playerStore.dispatch("playMusicWithSongIdAction", { id });
			// 3.获取到播放列表/当前歌曲的索引
		},
	},
});
