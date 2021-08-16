import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";

import { useParams } from "react-router-dom";

import { Box, Image, SimpleGrid, Button } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function PetPage() {
	const { useContext, useState, useEffect } = React;

	const appContext = useContext(AppContext);
	const {
		userLogged,
		userData,
		setSavedPets,
		setMyPets,
		savedPets,
		myPets,
		allPets,
	} = appContext;

	const [pet, setPet] = useState();
	const [petSaved, setPetSaved] = useState(false);

	let { id } = useParams();

	useEffect(() => {
		const newArr = allPets.filter((ele) => {
			return ele.id === id;
		});
		console.log(newArr[0]);
		setPet(newArr[0]);
		// eslint-disable-next-line
	}, []);

	const idAppearsInArr = (array, ide) => {
		let check = false;
		array.forEach((ele) => {
			if (ele.id === ide) check = true;
		});
		return check;
	};

	useEffect(() => {
		if (pet) {
			if (idAppearsInArr(savedPets, pet.id)) setPetSaved(true);
			else setPetSaved(false);
		}
	}, [savedPets, pet]);

	const handleReturnPet = () => {
		setPet({ ...pet, ownerId: null, adoptionStatus: null });
		const newArr = myPets.filter((ele) => {
			return ele.id !== pet.id;
		});
		setMyPets(newArr);
	};

	const handleSavePet = () => {
		setSavedPets([...savedPets, pet]);
	};

	const handleUnSavePet = () => {
		let newArr;
		newArr = savedPets.filter((ele) => {
			return ele.id !== pet.id;
		});
		setSavedPets(newArr);
	};

	const handleAdoptPet = () => {
		setPet({ ...pet, ownerId: userData.id, adoptionStatus: "Adopted" });
		setMyPets([...myPets, pet]);
		handleUnSavePet();
	};

	const handleFosterPet = () => {
		setPet({ ...pet, ownerId: userData.id, adoptionStatus: "Fostered" });
		setMyPets([...myPets, pet]);
		handleUnSavePet();
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
						<Image src={pet.imageUrl} alt={pet.imageAlt} />
						<div className="h1 mb-3">{pet.name}</div>
						<SimpleGrid columns={2} spacing={5} className="h5 p-3">
							<Box>Type: {pet.type}</Box>
							<Box>Color: {pet.color}</Box>
							<Box>Height: {pet.height}</Box>
							<Box>Weight: {pet.weight}</Box>
							<Box>Breed: {pet.breed}</Box>
							<Box>Adoption Status: {pet.adoptionStatus}</Box>
							<Box>Hypoallergenic: {pet.hypoallergenic}</Box>
							<Box>
								Dietary Restrictions: {pet.dietaryRestrictions}
							</Box>
						</SimpleGrid>
						<div className="h3">Bio</div>
						<div className="h5 p-3 pt-0">{pet.bio}</div>
						{userLogged && (
							<div className="buttons">
								{pet.ownerId === userData.id ? (
									<>
										<Button
											colorScheme="blue"
											onClick={() => {
												handleReturnPet();
											}}
										>
											Return Pet
										</Button>
										{pet.adoptionStatus === "Fostered" ? (
											<Button
												colorScheme="blue"
												onClick={() => {
													handleAdoptPet();
												}}
											>
												Adopt Pet
											</Button>
										) : null}
									</>
								) : (
									<>
										<Button
											colorScheme="blue"
											onClick={() => {
												!petSaved
													? handleSavePet()
													: handleUnSavePet();
											}}
										>
											{!petSaved
												? "Save Pet For Later"
												: "Remove From Saved Pets"}
										</Button>
										{pet.adoptionStatus ===
										"Adopted" ? null : pet.adoptionStatus ===
										  "Fostered" ? (
											<Button
												colorScheme="blue"
												onClick={() => {
													handleAdoptPet();
												}}
											>
												Adopt Pet
											</Button>
										) : (
											<>
												<Button
													colorScheme="blue"
													onClick={() => {
														handleAdoptPet();
													}}
												>
													Adopt Pet
												</Button>
												<Button
													colorScheme="blue"
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
						)}
					</Box>
				)}
			</div>
		</>
	);
}
