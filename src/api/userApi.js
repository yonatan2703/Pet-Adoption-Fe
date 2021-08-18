import axios from "axios";
const baseUrl = "http://localhost:5050/";

export const login = async (user) => {
	try {
		const result = await axios.post(`${baseUrl}login`, user);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const signUp = async (user) => {
	try {
		const result = await axios.post(`${baseUrl}signup`, user);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const loginOnLoad = async () => {
	try {
		const result = await axios.get(`${baseUrl}login`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const makeAdmin = async (userId) => {
	try {
		const result = await axios.put(`${baseUrl}user/makeAdmin/${userId}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const unAdmin = async (userId) => {
	try {
		const result = await axios.put(`${baseUrl}user/unAdmin/${userId}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getAllUsers = async () => {
	try {
		const result = await axios.get(`${baseUrl}user`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}user/${id}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const editUser = async (id, user) => {
	try {
		const result = await axios.put(`${baseUrl}user/${id}`, user);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getAllUserDetails = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}user/${id}/full`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getUserPets = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}pet/user/${id}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};
