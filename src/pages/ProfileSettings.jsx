import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import PasswordInput from "../components/PasswordInput";

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
	const { userLogged, setUserData, userData, password } = appContext;

	const [tempUserData, setTempUserData] = useState({ ...userData });

	const handleSave = () => {
		let saved = true;
		if (saved) {
			setUserData({ ...tempUserData, password: password });
        }
        console.log(userData);
	};

	return (
		<>
			{!userLogged && <Redirect to="/home" />}
			<NavBar></NavBar>
			<div className="container">
				<Stack spacing={3} className="mb-3 mt-3">
					<FormControl id="user-email">
						<FormLabel>Email</FormLabel>
						<Input
							defaultValue={tempUserData.email}
							placeholder="Email"
							type="email"
							onChange={(e) =>
								setTempUserData({
									...tempUserData,
									email: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id="user-password">
						<FormLabel>New Password</FormLabel>
						<PasswordInput text="Password" />
					</FormControl>
					<FormControl id="user-Fname">
						<FormLabel>First Name</FormLabel>
						<Input
							placeholder="First name"
							type="text"
							defaultValue={tempUserData.firstName}
							onChange={(e) =>
								setTempUserData({
									...tempUserData,
									firstName: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id="user-Lname">
						<FormLabel>Last Name</FormLabel>
						<Input
							placeholder="Last name"
							type="text"
							defaultValue={tempUserData.lastName}
							onChange={(e) =>
								setTempUserData({
									...tempUserData,
									lastName: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id="user-phone">
						<FormLabel>Phone Number</FormLabel>
						<Input
							placeholder="Last name"
							type="tel"
							defaultValue={tempUserData.phoneNumber}
							onChange={(e) =>
								setTempUserData({
									...tempUserData,
									phoneNumber: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id="user-Lname">
						<FormLabel>Bio</FormLabel>
						<Textarea
							placeholder="Write your bio"
							type="text"
							defaultValue={tempUserData.bio}
							onChange={(e) =>
								setTempUserData({
									...tempUserData,
									bio: e.target.value,
								})
							}
						/>
					</FormControl>
				</Stack>
				<Button
					colorScheme="blue"
					onClick={() => {
						handleSave();
					}}
				>
					Save Changes
				</Button>
			</div>
		</>
	);
}
