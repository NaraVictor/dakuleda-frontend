const authenticate = (token, user) => {
	sessionStorage.setItem("token", token);
	sessionStorage.setItem("user", JSON.stringify(user));
};

const getToken = () => {
	return sessionStorage.getItem("token");
};

const getUser = () => {
	let str = sessionStorage.getItem("user");
	return JSON.parse(str);
};

const logOut = () => {
	sessionStorage.removeItem("token");
	removeRole();
};

const isAuthenticated = () => {
	const token = sessionStorage.getItem("token");
	return token ? true : false;
};

const setRole = (role) => {
	sessionStorage.setItem("role", role);
};

const removeRole = () => {
	sessionStorage.removeItem("role");
};

const getRole = () => {
	return sessionStorage.getItem("role");
};

export {
	authenticate,
	isAuthenticated,
	getToken,
	logOut,
	setRole,
	getRole,
	removeRole,
	getUser,
};
