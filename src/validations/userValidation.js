export const validateEmail = (value) => {
	let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (value.match(regexEmail)) {
		return null;
	}
	return "Email is not valid";
};

export const validatePassword = (value) => {
	let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	if (value.match(regexPassword)) {
		return null;
	}
	return "Your password must be at least 8 characters, contain at least one upper case and lower case letter and a number";
};

export const validateName = (value) => {
	let nameRegex = /^[a-zA-Z\-]+$/;
	if (value.match(nameRegex)) {
		return null;
	}
	return "Name is not valid";
};

export const validatePhone = (value) => {
	let phoneRegex = /\b((0\d[- ]\d{ 7 })| (0\d[- ]\d{ 3 } [- ]\d{ 4 })) \b/;
	if (value.match(phoneRegex)) {
		return null;
	}
	return "Phone is not valid";
};
