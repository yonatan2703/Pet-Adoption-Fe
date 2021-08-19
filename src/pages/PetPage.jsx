import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import {
	getPet,
	isPetSaved,
	savePet,
	deleteSavedPet,
	returnPet,
	adpotPet,
} from "../api/petApi";

import { useParams } from "react-router-dom";

import { Box, Image, SimpleGrid, Button } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function PetPage() {
	const { useContext, useState, useEffect } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	const [pet, setPet] = useState();
	const [petSaved, setPetSaved] = useState(false);

	let { id } = useParams();

	useEffect(() => {
		if (userData) {
			getPet(id)
				.then((res) => {
					setPet(res.data.pet);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		// eslint-disable-next-line
	}, [userData]);

	useEffect(() => {
		if (pet) {
			isPetSaved(id)
				.then((res) => {
					console.log(res);
					if (res.data.result) setPetSaved(true);
					else setPetSaved(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} // eslint-disable-next-line
	}, [pet]);

	const handleReturnPet = async () => {
		try {
			const res = await returnPet(id);
			if (res.data.result)
				setPet({
					...pet,
					owner_id: null,
					adoption_status: "Available",
				});
		} catch (err) {
			console.log(err);
		}
	};

	const handleSavePet = async () => {
		try {
			const res = await savePet(id);
			setPetSaved(!petSaved);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnSavePet = async () => {
		try {
			const res = await deleteSavedPet(id);
			setPetSaved(!petSaved);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAdoptPet = async () => {
		try {
			const res = await adpotPet(id, "Adopted");
			setPet({
				...pet,
				owner_id: userData.user_id,
				adoption_status: "Adopted",
			});
			await handleUnSavePet();
		} catch (err) {
			console.log(err);
		}
	};

	const handleFosterPet = async () => {
		try {
			const res = await adpotPet(id, "Fostered");
			setPet({
				...pet,
				owner_id: userData.user_id,
				adoption_status: "Fostered",
			});
			await handleUnSavePet();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<NavBar></NavBar>
			<div className="container mt-3">
				{pet && (
					<Box
						w="42%"
						borderWidth="3px"
						borderRadius="lg"
						overflow="hidden"
						className="d-flex flex-column align-items-center pb-3 mb-3"
					>
						<Image src={pet.image_url} alt={pet.image_alt} />
						<div className="h1 mb-3">{pet.name}</div>
						<SimpleGrid columns={2} spacing={5} className="h5 p-3">
							<Box>Type: {pet.type}</Box>
							<Box>Color: {pet.color}</Box>
							<Box>Height: {pet.height}</Box>
							<Box>Weight: {pet.weight}</Box>
							<Box>Breed: {pet.breed}</Box>
							<Box>Adoption Status: {pet.adoption_status}</Box>
							<Box>Hypoallergenic: {pet.hypoallergenic}</Box>
							<Box>
								Dietary Restrictions: {pet.dietary_restrictions}
							</Box>
						</SimpleGrid>
						<div className="h3">Bio</div>
						<div className="h5 p-3 pt-0">{pet.bio}</div>
						{userData && (
							<div className="buttons">
								{pet.owner_id === userData.user_id ? (
									<>
										<Button
											colorScheme="blue"
											onClick={async () => {
												await handleReturnPet();
											}}
										>
											Return Pet
										</Button>
										{pet.adoption_status === "Fostered" && (
											<Button
												colorScheme="blue"
												onClick={async () => {
													await handleAdoptPet();
												}}
											>
												Adopt Pet
											</Button>
										)}
									</>
								) : (
									<>
										<Button
											colorScheme="blue"
											onClick={async () => {
												!petSaved
													? await handleSavePet()
													: await handleUnSavePet();
											}}
										>
											{!petSaved
												? "Save Pet For Later"
												: "Remove From Saved Pets"}
										</Button>
										{pet.adoption_status ===
										"Adopted" ? null : pet.adoption_status ===
										  "Fostered" ? (
											<Button
												colorScheme="blue"
												onClick={async () => {
													await handleAdoptPet();
												}}
											>
												Adopt Pet
											</Button>
										) : (
											<>
												<Button
													colorScheme="blue"
													onClick={async () => {
														await handleAdoptPet();
													}}
												>
													Adopt Pet
												</Button>
												<Button
													colorScheme="blue"
													onClick={async () => {
														await handleFosterPet();
													}}
												>
													Foster Pet
												</Button>
											</>
										)}
									</>
								)}
							</div>
						)}
					</Box>
				)}
			</div>
		</>
	);
}
