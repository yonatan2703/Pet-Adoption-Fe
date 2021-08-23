import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import PasswordInput from "../components/PasswordInput";
import AppContext from "../context/AppContext";
import { editUserById, getAllUserDetails } from "../api/userApi";

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
	const { useState, useEffect, useContext, useRef } = React;

	const { id } = useParams();
	const appContext = useContext(AppContext);
	const { userData } = appContext;

	const [userSavedPets, setUserSavedPets] = useState();
	const [userOwnedPets, setUserOwnedPets] = useState();
	const [togglePets, setTogglePets] = useState(true);
	const [userDataFromId, setUserDataFromId] = useState();

	const passwordRef = useRef();
	const emailRef = useRef();
	const first_nameRef = useRef();
	const last_nameRef = useRef();
	const phoneRef = useRef();
	const bioRef = useRef();

	const handleSave = async () => {
		const res = await editUserById(userDataFromId.user_id, {
			email: emailRef.current.value,
			fName: first_nameRef.current.value,
			lName: last_nameRef.current.value,
			phone: phoneRef.current.value,
			bio: bioRef.current.value,
			password: passwordRef?.current?.value,
		});
		setUserDataFromId(res.data.user);
	};

	useEffect(() => {
		getAllUserDetails(id)
			.then((res) => {
				setUserDataFromId(res.data.userData.user);
				setUserSavedPets(res.data.userPets.savedPets);
				setUserOwnedPets(res.data.userPets.ownedPets);
			})
			.catch((err) => {
				console.log(err);
			}); // eslint-disable-next-line
	}, []);

	return (
		<>
			{userData?.role !== "admin" && <Redirect from="" to="/home" />}
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
							defaultValue={userDataFromId?.email}
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
							defaultValue={userDataFromId?.first_name}
						/>
					</FormControl>
					<FormControl id="user-Lname" isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input
							placeholder="Last name"
							ref={last_nameRef}
							type="text"
							defaultValue={userDataFromId?.last_name}
						/>
					</FormControl>
					<FormControl id="user-phone" isRequired>
						<FormLabel>Phone Number</FormLabel>
						<Input
							placeholder="Phone"
							ref={phoneRef}
							type="text"
							defaultValue={userDataFromId?.phone}
						/>
					</FormControl>
					<FormControl id="user-bio" isRequired>
						<FormLabel>Bio</FormLabel>
						<Textarea
							placeholder="Write your bio"
							ref={bioRef}
							type="text"
							defaultValue={userDataFromId?.bio}
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
