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
} from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function AdminAddPet() {
	const { useContext, useState } = React;

	const appContext = useContext(AppContext);
	const { userAdmin, animalTypes, userLogged } = appContext;

	const [pet, setPet] = useState();

	const handleAddPet = () => {
		console.log(pet);
	};

	return (
		<>
			{!userLogged && !userAdmin && <Redirect to="/home" />}
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
								setPet({
									...pet,
									name: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Type</FormLabel>
						<Select
							placeholder="Type of animal"
							onChange={(e) => {
								setPet({
									...pet,
									type: e.target.value,
								});
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
								setPet({
									...pet,
									color: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-height" isRequired>
						<FormLabel>Height</FormLabel>
						<Input
							placeholder="Animal Height"
							onChange={(e) => {
								setPet({
									...pet,
									height: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-weight" isRequired>
						<FormLabel>Weight</FormLabel>
						<Input
							placeholder="Animal Weight"
							onChange={(e) => {
								setPet({
									...pet,
									weight: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-breed" isRequired>
						<FormLabel>Breed</FormLabel>
						<Input
							placeholder="Animal Breed"
							onChange={(e) => {
								setPet({
									...pet,
									breed: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="adoption-status" isRequired>
						<FormLabel>Adoption status</FormLabel>
						<Select
							placeholder="Adoption status"
							onChange={(e) => {
								setPet({
									...pet,
									adoptionStatus: e.target.value,
								});
							}}
						>
							<option>Adopted</option>
							<option>Fostered</option>
							<option>Null</option>
						</Select>
					</FormControl>
					<FormControl id="animal-hypoallergenic" isRequired>
						<FormLabel>Hypoallergenic</FormLabel>
						<Input
							placeholder="Animal Hypoallergenic"
							onChange={(e) => {
								setPet({
									...pet,
									hypoallergenic: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-dietary-restrictions" isRequired>
						<FormLabel>Dietary Restrictions</FormLabel>
						<Input
							placeholder="Animal Dietary Restrictions"
							onChange={(e) => {
								setPet({
									...pet,
									dietaryRestrictions: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-image" isRequired>
						<FormLabel>Image</FormLabel>
						<Input
							type="file"
							onChange={(e) => {
								setPet({
									...pet,
									imageUrl: e.target.value,
								});
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
							setPet({
								...pet,
								bio: e.target.value,
							});
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
