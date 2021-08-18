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
	const { useState, useContext } = React;

	const appContext = useContext(AppContext);
	// eslint-disable-next-line
	const { userData, setUserData } = appContext;

	const [password, setPassword] = useState();
	const [email, setEmail] = useState(userData?.email);
	const [first_name, setFirst_name] = useState(userData?.first_name);
	const [last_name, setLast_name] = useState(userData?.last_name);
	const [phone, setPhone] = useState(userData?.phone);
	const [bio, setBio] = useState(userData?.bio);

	const handleSave = async () => {
		const res = await editUser(userData.user_id, {
			email: email,
			fName: first_name,
			lName: last_name,
			phone: phone,
			bio: bio,
			password: password,
		});
		setUserData(res.data.user);
	};

	return (
		<>
			{!userData && <Redirect to="/home" />}
			<NavBar></NavBar>
			<form
				className="container"
				onSubmit={() => {
					handleSave();
				}}
			>
				<Stack spacing={3} className="mb-3 mt-3">
					<FormControl id="user-email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							defaultValue={email}
							placeholder="Email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl id="user-password">
						<FormLabel>New Password</FormLabel>
						<PasswordInput
							text="Password"
							setPassword={setPassword}
						/>
					</FormControl>
					<FormControl id="user-Fname" isRequired>
						<FormLabel>First Name</FormLabel>
						<Input
							placeholder="First name"
							type="text"
							defaultValue={first_name}
							onChange={(e) => setFirst_name(e.target.value)}
						/>
					</FormControl>
					<FormControl id="user-Lname" isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input
							placeholder="Last name"
							type="text"
							defaultValue={last_name}
							onChange={(e) => setLast_name(e.target.value)}
						/>
					</FormControl>
					<FormControl id="user-phone" isRequired>
						<FormLabel>Phone Number</FormLabel>
						<Input
							placeholder="Phone"
							type="text"
							defaultValue={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</FormControl>
					<FormControl id="user-bio" isRequired>
						<FormLabel>Bio</FormLabel>
						<Textarea
							placeholder="Write your bio"
							type="text"
							defaultValue={bio}
							onChange={(e) => setBio(e.target.value)}
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
