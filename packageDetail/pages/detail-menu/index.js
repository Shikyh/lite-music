// packageDetail/pages/detail-menu/index.js
import { getSongMenuTags, getSongMenu } from "../../../service/api_music";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		songMenuList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getSongMenuDetail();
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {},
	async getSongMenuDetail() {
		const res = await getSongMenuTags();
		const tags = res.tags;
		const songMenuList = [];
		const promises = [];
		for (const index in tags) {
			const name = tags[index].name;
			songMenuList[index] = { name, list: [] };
			promises.push(getSongMenu(name));
		}
		Promise.all(promises).then((menuLists) => {
			for (const index in menuLists) {
				const menuList = menuLists[index];
				songMenuList[index].list = menuList.playlists;
			}
			this.setData({ songMenuList });
		});
	},

	songItemClick(event) {
		const id = event.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/packageDetail/pages/detail-songs/index?id=${id}&type=menu`,
		});
	},
});
