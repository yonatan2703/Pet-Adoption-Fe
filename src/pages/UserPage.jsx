import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import PasswordInput from "../components/PasswordInput";
import AppContext from "../context/AppContext";
import { editUser, getAllUserDetails } from "../api/userApi";

import { Redirect, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
	Button,
	FormControl,
	FormLabel,
	Stack,
	Input,
	Textarea,
	SimpleGrid,
} from "@chakra-ui/react";

export default function Search() {
	const { useState, useEffect, useContext } = React;

	const { id } = useParams();
	const appContext = useContext(AppContext);
	const { userData } = appContext;

	const [userSavedPets, setUserSavedPets] = useState();
	const [userOwnedPets, setUserOwnedPets] = useState();
	const [togglePets, setTogglePets] = useState(true);
	const [userDataFromId, setUserDataFromId] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [phone, setPhone] = useState();
	const [bio, setBio] = useState();

	const handleSave = async () => {
		const res = await editUser(userDataFromId.user_id, {
			email: email,
			fName: first_name,
			lName: last_name,
			phone: phone,
			bio: bio,
			password: password,
		});
		setUserDataFromId(res.data.user);
	};

	useEffect(() => {
		getAllUserDetails(id)
			.then((res) => {
				setUserDataFromId(res.data.userData.user);
				setUserSavedPets(res.data.userPets.ownedPets);
				setUserOwnedPets(res.data.userPets.ownedPets);
			})
			.catch((err) => {
				console.log(err);
			}); // eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (userDataFromId) {
			setEmail(userDataFromId.email);
			setFirst_name(userDataFromId.first_name);
			setLast_name(userDataFromId.last_name);
			setPhone(userDataFromId.phone);
			setBio(userDataFromId.bio);
		}
	}, [userDataFromId]);

	return (
		<>
			{userData?.role !== "admin" && <Redirect from="" to="/home" />}
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
			<div className="container">
				<Button
					colorScheme="blue"
					onClick={() => {
						setTogglePets(!togglePets);
					}}
					className="mt-3"
				>
					{togglePets ? "Show My Saved Pets" : "Show My Pets"}
				</Button>
				{togglePets ? (
					userOwnedPets && userOwnedPets.length ? (
						<SimpleGrid columns={4} spacing={5}>
							{userOwnedPets.map((ele, i) => {
								return (
									<PetCard
										key={uuidv4()}
										pet={ele}
										width={"100%"}
									></PetCard>
								);
							})}
						</SimpleGrid>
					) : (
						<div className="h1">
							You currently do not own or foster any pets.
						</div>
					)
				) : userSavedPets && userSavedPets.length ? (
					<SimpleGrid columns={4} spacing={5}>
						{userSavedPets.map((ele) => {
							return (
								<PetCard
									key={uuidv4()}
									pet={ele}
									width={"100%"}
								></PetCard>
							);
						})}
					</SimpleGrid>
				) : (
					<div className="h1">
						You currently do not have any saved pets.
					</div>
				)}
			</div>
		</>
	);
}
