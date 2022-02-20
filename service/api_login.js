import { logRequest } from "./index";

export function getLoginCode() {
	return new Promise((resolve, reject) => {
		wx.login({
			timeout: 1000,
			success: (res) => {
				const code = res.code;
				resolve(code);
			},
			fail: (err) => {
				console.log(err);
				reject(err);
			},
		});
	});
}

export function codeToToken(code) {
	return logRequest.post("/login", { code });
}

export function checkToken() {
	return logRequest.post("/auth", {}, true);
}

export function postFavorRequest(id) {
	return logRequest.post("/api/favor", { id }, true);
}

export function checkSession() {
	return new Promise((resolve) => {
		wx.checkSession({
			success: () => {
				resolve(true);
			},
			fail: () => {
				resolve(false);
			},
		});
	});
}

export function getUserInfo() {
	return new Promise((resolve, reject) => {
		wx.getUserProfile({
			desc: "",
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			},
		});
	});
}
