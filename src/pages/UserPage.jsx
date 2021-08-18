import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";

import { Redirect } from "react-router-dom";

import {
	SimpleGrid,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Select,
	Button,
	Checkbox,
} from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function UserPage() {
	const { useContext, useState } = React;

	const appContext = useContext(AppContext);
	const { animalTypes, userData } = appContext;

	const [petName, setPetName] = useState();
	const [petType, setPetType] = useState();
	const [petColor, setPetColor] = useState();
	const [petHeight, setPetHeight] = useState();
	const [petWeight, setPetWeight] = useState();
	const [petBreed, setPetBreed] = useState();
	const [petadoption_statusus, setPetadoption_statusus] = useState();
	const [petHypoallergenic, setPetHypoallergenic] = useState();
	const [petDietaryRestrictions, setPetDietaryRestrictions] = useState();
	const [petBio, setPetBio] = useState();
	const [petImage, setPetImage] = useState();

	const handleAddPet = () => {
		const petToAdd = {
			image_url: petImage,
			type: petType,
			name: petName,
			adoption_status: petadoption_statusus,
			height: petHeight,
			weight: petWeight,
			color: petColor,
			bio: petBio,
			hypoallergenic: petHypoallergenic,
			dietary_restrictions: petDietaryRestrictions,
			breed: petBreed,
		};
		console.log(petToAdd);
	};

	return (
		<>
			{userData?.role !== "admin" && <Redirect from="" to="/home" />}
			<NavBar></NavBar>
			<form
				className="container mt-3"
				onSubmit={(e) => {
					e.preventDefault();
					handleAddPet();
				}}
			>
				<SimpleGrid columns={2} spacing={5} className="width-full">
					<FormControl id="animal-name" isRequired>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="Animal name"
							onChange={(e) => {
								setPetName(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Type</FormLabel>
						<Select
							placeholder="Type of animal"
							onChange={(e) => {
								setPetType(e.target.value);
							}}
						>
							{animalTypes.map((ele) => {
								return <option>{ele}</option>;
							})}
						</Select>
					</FormControl>
					<FormControl id="animal-color" isRequired>
						<FormLabel>Color</FormLabel>
						<Input
							placeholder="Animal Color"
							onChange={(e) => {
								setPetColor(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="animal-height" isRequired>
						<FormLabel>Height</FormLabel>
						<Input
							placeholder="Animal Height"
							onChange={(e) => {
								setPetHeight(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="animal-weight" isRequired>
						<FormLabel>Weight</FormLabel>
						<Input
							placeholder="Animal Weight"
							onChange={(e) => {
								setPetWeight(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="animal-breed" isRequired>
						<FormLabel>Breed</FormLabel>
						<Input
							placeholder="Animal Breed"
							onChange={(e) => {
								setPetBreed(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="adoption-status" isRequired>
						<FormLabel>Adoption status</FormLabel>
						<Select
							placeholder="Adoption status"
							onChange={(e) => {
								setPetadoption_statusus(e.target.value);
							}}
						>
							<option>Adopted</option>
							<option>Fostered</option>
							<option>Available</option>
						</Select>
					</FormControl>
					<FormControl id="animal-hypoallergenic" isRequired>
						<FormLabel>Hypoallergenic</FormLabel>
						<Checkbox>Checkbox</Checkbox>
						<Input
							placeholder="Animal Hypoallergenic"
							onChange={(e) => {
								setPetHypoallergenic(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="animal-dietary-restrictions" isRequired>
						<FormLabel>Dietary Restrictions</FormLabel>
						<Input
							placeholder="Animal Dietary Restrictions"
							onChange={(e) => {
								setPetDietaryRestrictions(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl id="animal-image" isRequired>
						<FormLabel>Image</FormLabel>
						<Input
							type="file"
							onChange={(e) => {
								setPetImage(e.target.value);
							}}
						/>
					</FormControl>
				</SimpleGrid>
				<FormControl
					id="animal-Bio"
					className="width-full mt-3"
					isRequired
				>
					<FormLabel>Bio</FormLabel>
					<Textarea
						type="textarea"
						placeholder="Animal Bio"
						onChange={(e) => {
							setPetBio(e.target.value);
						}}
					/>
				</FormControl>
				<Button className="mt-3" colorScheme="blue" type="submit">
					Add Pet
				</Button>
			</form>
		</>
	);
}
