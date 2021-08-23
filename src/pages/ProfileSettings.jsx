import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import PasswordInput from "../components/PasswordInput";
import { editUser } from "../api/userApi";

import { Redirect } from "react-router-dom";

import {
	Button,
	FormControl,
	FormLabel,
	Stack,
	Input,
	Textarea,
} from "@chakra-ui/react";

export default function Search() {
	const { useContext, useRef } = React;

	const appContext = useContext(AppContext);
	const { userData, setUserData } = appContext;

	const passwordRef = useRef();
	const emailRef = useRef();
	const first_nameRef = useRef();
	const last_nameRef = useRef();
	const phoneRef = useRef();
	const bioRef = useRef();

	const handleSave = async () => {
		const res = await editUser({
			email: emailRef.current.value,
			fName: first_nameRef.current.value,
			lName: last_nameRef.current.value,
			phone: phoneRef.current.value,
			bio: bioRef.current.value,
			password: passwordRef?.current?.value,
		});
		setUserData(res.data.user);
	};

	return (
		<>
			{!userData && <Redirect from="" to="/home" />}
			<NavBar></NavBar>
			<form
				className="container"
				onSubmit={async (e) => {
					e.preventDefault();
					await handleSave();
				}}
			>
				<Stack spacing={3} className="mb-3 mt-3">
					<FormControl id="user-email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							defaultValue={userData?.email}
							ref={emailRef}
							placeholder="Email"
							type="email"
						/>
					</FormControl>
					<FormControl id="user-password">
						<FormLabel>New Password</FormLabel>
						<PasswordInput text="Password" setRef={passwordRef} />
					</FormControl>
					<FormControl id="user-Fname" isRequired>
						<FormLabel>First Name</FormLabel>
						<Input
							placeholder="First name"
							ref={first_nameRef}
							type="text"
							defaultValue={userData?.first_name}
						/>
					</FormControl>
					<FormControl id="user-Lname" isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input
							placeholder="Last name"
							ref={last_nameRef}
							type="text"
							defaultValue={userData?.last_name}
						/>
					</FormControl>
					<FormControl id="user-phone" isRequired>
						<FormLabel>Phone Number</FormLabel>
						<Input
							placeholder="Phone"
							ref={phoneRef}
							type="text"
							defaultValue={userData?.phone}
						/>
					</FormControl>
					<FormControl id="user-bio" isRequired>
						<FormLabel>Bio</FormLabel>
						<Textarea
							placeholder="Write your bio"
							ref={bioRef}
							type="text"
							defaultValue={userData?.bio}
						/>
					</FormControl>
				</Stack>
				<Button colorScheme="blue" type="submit">
					Save Changes
				</Button>
			</form>
		</>
	);
}
