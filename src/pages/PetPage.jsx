import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";

import { Redirect } from "react-router-dom";

import { Box, Image, SimpleGrid, Button } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function PetPage() {
	const { useContext, useState } = React;

	const appContext = useContext(AppContext);
	const { userLogged, userData } = appContext;

	const property = {
		imageUrl: "https://bit.ly/2Z4KKcF",
		imageAlt: "Rear view of modern home with pool",
		type: "dog",
		name: "Poppy",
		adoptionStat: "Adopted",
		height: 50,
		weight: 50,
		color: "brown",
		bio: "large bio with alot of words and things inside of it do i see or do you understand",
		hypoallergenic: true,
		dietaryRestrictions: "none",
		breed: "Poodle",
		ownerId: "some_id",
	};

	const [pet, setPet] = useState(property);

	const handleReturnPet = () => {
		setPet({ ...pet, ownerId: null, adoptionStat: null });
	};

	const handleSavePet = () => {};
	const handleAdoptPet = () => {
		setPet({ ...pet, ownerId: userData.id, adoptionStat: "Adopted" });
	};
	const handleFosterPet = () => {
		setPet({ ...pet, adoptionStat: "Fostered" });
	};

	return (
		<>
			{!userLogged && <Redirect to="/home" />}
			<NavBar></NavBar>
			<div className="container mt-3">
				<Box
					w="42%"
					borderWidth="3px"
					borderRadius="lg"
					overflow="hidden"
					className="d-flex flex-column align-items-center pb-3"
				>
					<Image src={pet.imageUrl} alt={pet.imageAlt} />
					<div className="h1 mb-3">{pet.name}</div>
					<SimpleGrid columns={2} spacing={5} className="h5 p-3">
						<Box>Type: {pet.type}</Box>
						<Box>Color: {pet.color}</Box>
						<Box>Height: {pet.height}</Box>
						<Box>Weight: {pet.weight}</Box>
						<Box>Breed: {pet.breed}</Box>
						<Box>Adoption Status: {pet.adoptionStat}</Box>
						<Box>Hypoallergenic: {pet.hypoallergenic}</Box>
						<Box>
							Dietary Restrictions: {pet.dietaryRestrictions}
						</Box>
					</SimpleGrid>
					<div className="h3">Bio</div>
					<div className="h5 p-3 pt-0">{pet.bio}</div>
					<div className="buttons">
						{pet.ownerId === userData.id ? (
							<Button
								onClick={() => {
									handleReturnPet();
								}}
							>
								Return Pet
							</Button>
						) : (
							<>
								<Button
									onClick={() => {
										handleSavePet();
									}}
								>
									Save Pet For Later
								</Button>
								{pet.adoptionStat ===
								"Adopted" ? null : pet.adoptionStat ===
								  "Fostered" ? (
									<Button
										onClick={() => {
											handleAdoptPet();
										}}
									>
										Adopt Pet
									</Button>
								) : (
									<>
										<Button
											onClick={() => {
												handleAdoptPet();
											}}
										>
											Adopt Pet
										</Button>
										<Button
											onClick={() => {
												handleFosterPet();
											}}
										>
											Foster Pet
										</Button>
									</>
								)}
							</>
						)}
					</div>
				</Box>
			</div>
		</>
	);
}
