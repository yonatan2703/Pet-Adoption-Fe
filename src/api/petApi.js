import axios from "axios";
const baseUrl = "https://pet-shop-y-be.herokuapp.com/";

export const addPet = async (pet) => {
	try {
		const result = await axios.post(`${baseUrl}pet`, pet);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const searchPets = async (query) => {
	try {
		const result = await axios.get(`${baseUrl}pet/${query}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getPet = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}pet/${id}`);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const editPet = async (id, pet) => {
	try {
		const result = await axios.put(`${baseUrl}pet/${id}`, pet);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const adpotPet = async (id, adoption_status) => {
	try {
		const result = await axios.post(`${baseUrl}pet/${id}/adopt`, {
			adoption_status: adoption_status,
		});
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const returnPet = async (id) => {
	try {
		const result = await axios.post(`${baseUrl}pet/${id}/return`, {});
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const savePet = async (id) => {
	try {
		const result = await axios.post(`${baseUrl}pet/${id}/save`, {});
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteSavedPet = async (id) => {
	try {
		const result = await axios.delete(`${baseUrl}pet/${id}/save`, {});
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const addPetImg = async (id, petImg) => {
	try {
		const result = await axios.put(`${baseUrl}pet/${id}/img`, petImg);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const isPetSaved = async (id) => {
	try {
		const result = await axios.get(`${baseUrl}pet/${id}/saved`);
		return result;
	} catch (error) {
		console.log(error);
	}
};
