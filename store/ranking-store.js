import { HYEventStore } from "hy-event-store";
import { getSongMenuDetail } from "../service/api_music";

const rankingMap = {
	3779629: "newRanking",
	3778678: "hotRanking",
	2884035: "originRanking",
	19723756: "upRanking",
};

const rankingStore = new HYEventStore({
	state: {
		newRanking: {}, // 0: 新歌
		hotRanking: {}, // 1: 热门
		originRanking: {}, // 2: 原创
		upRanking: {}, // 3: 飙升
	},
	actions: {
		getRankingDataAction(ctx) {
			for (let i in rankingMap) {
				getSongMenuDetail(i).then((res) => {
					const rankingName = rankingMap[i];
					ctx[rankingName] = res.playlist;
				});
			}
		},
	},
});

export { rankingStore, rankingMap };
