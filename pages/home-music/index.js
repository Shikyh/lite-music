// pages/home-music/index.js
import { rankingStore, rankingMap, playerStore } from "../../store/index";
import { getBanners, getSongMenu } from "../../service/api_music";
import queryRect from "../../utils/query-rect";
import throttle from "../../utils/throttle";

const throttleQueryRect = throttle(queryRect, 1000, { trailing: true });
Page({
	data: {
		swiperHeight: 0,
		banners: [],
		hotSongMenu: [],
		recommendSongMenu: [],
		recommendSongs: [],
		rankings: { 3779629: {}, 2884035: {}, 19723756: {} },

		currentSong: {},
		isPlaying: false,
		playAnimState: "paused",
	},

	onLoad: function (options) {
		// playerStore.dispatch("playMusicWithSongIdAction", { id: 1842025914 })

		// 获取页面数据
		this.getPageData();

		// 发起共享数据的请求
		rankingStore.dispatch("getRankingDataAction");

		// 从store获取共享的数据
		this.setupPlayerStoreListener();
	},

	getPageData: function () {
		getBanners().then((res) => {
			this.setData({ banners: res.banners });
		});

		getSongMenu().then((res) => {
			this.setData({ hotSongMenu: res.playlists });
		});

		getSongMenu("华语").then((res) => {
			this.setData({ recommendSongMenu: res.playlists });
		});
	},

	// 事件处理
	handleSearchClick: function () {
		wx.navigateTo({
			url: "/packageDetail/pages/detail-search/index",
		});
	},

	handleSwiperImageLoaded: function () {
		// 获取图片的高度(如果去获取某一个组件的高度)
		throttleQueryRect(".swiper-image").then((res) => {
			const rect = res[0];
			this.setData({ swiperHeight: rect.height });
		});
	},

	handleMoreClick: function () {
		this.navigateToDetailSongsPage("hotRanking");
	},

	handleRankingItemClick: function (event) {
		const idx = event.currentTarget.dataset.idx;
		const rankingName = rankingMap[idx];
		this.navigateToDetailSongsPage(rankingName);
	},

	navigateToDetailSongsPage: function (rankingName) {
		wx.navigateTo({
			url: `/packageDetail/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
		});
	},

	handleSongItemClick: function (event) {
		const index = event.currentTarget.dataset.index;
		playerStore.setState("playListSongs", this.data.recommendSongs);
		playerStore.setState("playListIndex", index);
	},

	handlePlayBtnClick: function (event) {
		playerStore.dispatch(
			"changeMusicPlayStatusAction",
			!this.data.isPlaying
		);
	},

	handlePlayBarClick: function () {
		wx.navigateTo({
			url: "/pages/music-player/index?id=" + this.data.currentSong.id,
		});
	},

	// 卸载页面
	onUnload: function () {
		// rankingStore.offState("newRanking", this.getNewRankingHandler)
	},

	setupPlayerStoreListener: function () {
		// 1.排行榜监听
		rankingStore.onState("hotRanking", (res) => {
			if (!res.tracks) return;
			const recommendSongs = res.tracks.slice(0, 6);
			this.setData({ recommendSongs });
		});
		rankingStore.onState("newRanking", this.getRankingHandler(3779629));
		rankingStore.onState("originRanking", this.getRankingHandler(2884035));
		rankingStore.onState("upRanking", this.getRankingHandler(19723756));

		// 2.播放器监听
		playerStore.onStates(
			["currentSong", "isPlaying"],
			({ currentSong, isPlaying }) => {
				if (currentSong) this.setData({ currentSong });
				if (isPlaying !== undefined) {
					this.setData({
						isPlaying,
						playAnimState: isPlaying ? "running" : "paused",
					});
				}
			}
		);
	},

	getRankingHandler: function (idx) {
		return (res) => {
			if (Object.keys(res).length === 0) return;
			const name = res.name;
			const coverImgUrl = res.coverImgUrl;
			const playCount = res.playCount;
			const songList = res.tracks.slice(0, 3);
			const rankingObj = { name, coverImgUrl, playCount, songList };
			const newRankings = { ...this.data.rankings, [idx]: rankingObj };
			this.setData({
				rankings: newRankings,
			});
		};
	},
});
