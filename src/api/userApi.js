import axios from "axios";
const baseUrl = "https://pet-adoption-app-be.herokuapp.com/";

export const login = async (user) => {
	console.log(baseUrl);
	try {
		const result = await axios.post(`${baseUrl}login`, user);
		axios.defaults.headers.common["Authorization"] = result.data.token;
		return result;
	} catch (error) {
		return error;
	}
};

export const signUp = async (user) => {
	try {
		const result = await axios.post(`${baseUrl}signup`, user);
		return result;
	} catch (error) {
		return error;
	}
};

export const loginOnLoad = async () => {
	try {
		const result = await axios.get(`${baseUrl}login`);
		return result;
	} catch (error) {
		return error;
	}
};

export const makeAdmin = async (userId) => {
	try {
		const result = await axios.put(`${baseUrl}user/makeAdmin/${userId}`);
		return result;
	} catch (error) {
		return error;
	}
};

export const unAdmin = async (userId) => {
	try {
		const result = await axios.put(`${baseUrl}user/unAdmin/${userId}`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getAllUsers = async () => {
	try {
		const result = await axios.get(`${baseUrl}user`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getUserById = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}user/${id}`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getUser = async () => {
	try {
		const result = await axios.get(`${baseUrl}user`);
		return result;
	} catch (error) {
		return error;
	}
};

export const editUserById = async (id, user) => {
	try {
		const result = await axios.put(`${baseUrl}user/${id}`, user);
		return result;
	} catch (error) {
		return error;
	}
};

export const editUser = async (user) => {
	try {
		const result = await axios.put(`${baseUrl}user`, user);
		return result;
	} catch (error) {
		return error;
	}
};

export const getAllUserDetails = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}user/${id}/full`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getAllMyDetails = async () => {
	try {
		const result = await axios.get(`${baseUrl}user/full`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getUserPets = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}pet/user/${id}`);
		return result;
	} catch (error) {
		return error;
	}
};

export const getMyPets = async () => {
	try {
		const result = await axios.get(`${baseUrl}pet/user`);
		return result;
	} catch (error) {
		return error;
	}
};
