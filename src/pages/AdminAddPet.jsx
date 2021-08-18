import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import { addPet, addPetImg } from "../api/petApi";

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
	NumberInput,
	NumberInputField,
} from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function AdminAddPet() {
	const { useContext, useState } = React;

	const appContext = useContext(AppContext);
	const { animalTypes, userData } = appContext;

	const [pet, setPet] = useState({
		hypoallergenic: false,
	});
	const [petImg, setPetImg] = useState();

	const handleAddPet = async () => {
		console.log(pet);
		try {
			const res = await addPet(pet);
			console.log(res);
			const res2 = await addPetImg(res.data.result.insertId, petImg);
			console.log(res2);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{!userData?.role === "admin" && <Redirect to="/home" />}
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
						<NumberInput max={160} min={5}>
							<NumberInputField
								placeholder="Animal Height"
								type="number"
								onChange={(e) => {
									setPet({
										...pet,
										height: +e.target.value,
									});
								}}
							/>
						</NumberInput>
					</FormControl>
					<FormControl id="animal-weight" isRequired>
						<FormLabel>Weight</FormLabel>
						<NumberInput max={100} min={5}>
							<NumberInputField
								placeholder="Animal Weight"
								type="number"
								onChange={(e) => {
									setPet({
										...pet,
										weight: +e.target.value,
									});
								}}
							/>
						</NumberInput>
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
									adoption_status: e.target.value,
								});
							}}
						>
							<option>Adopted</option>
							<option>Fostered</option>
							<option>Available</option>
						</Select>
					</FormControl>
					<FormControl id="animal-hypoallergenic" isRequired>
						<FormLabel>Hypoallergenic</FormLabel>
						<Checkbox
							onChange={(e) => {
								setPet({
									...pet,
									hypoallergenic: e.target.checked,
								});
							}}
						>
							Checkbox
						</Checkbox>
					</FormControl>
					<FormControl id="animal-dietary-restrictions" isRequired>
						<FormLabel>Dietary Restrictions</FormLabel>
						<Input
							placeholder="Animal Dietary Restrictions"
							onChange={(e) => {
								setPet({
									...pet,
									dietary_restrictions: e.target.value,
								});
							}}
						/>
					</FormControl>
					<FormControl id="animal-image" isRequired>
						<FormLabel>Image</FormLabel>
						<Input
							type="file"
							onChange={(e) => {
								const file = e.target.files[0];
								const formData = new FormData();
								formData.append("img", file);
								setPetImg(formData);
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
