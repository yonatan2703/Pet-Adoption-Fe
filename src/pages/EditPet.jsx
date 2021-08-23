import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import { editPet, addPetImg, getPet } from "../api/petApi";

import {  useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

export default function EditPet() {
	const { useContext, useState, useEffect } = React;

	const appContext = useContext(AppContext);
	const { animalTypes } = appContext;

	const [pet, setPet] = useState({
		hypoallergenic: false,
	});
	const [petImg, setPetImg] = useState();

	let { id } = useParams();

	useEffect(() => {
		getPet(id)
			.then((res) => {
				setPet(res.data.pet);
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	const handleAddPet = async () => {
		try {
			// eslint-disable-next-line
			const res = await editPet(id, pet);
			if (petImg) {
				// eslint-disable-next-line
				const res2 = await addPetImg(id, petImg);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<NavBar></NavBar>
			{pet && (
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
								defaultValue={pet.name}
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
								value={pet.type}
								onChange={(e) => {
									setPet({
										...pet,
										type: e.target.value,
									});
								}}
							>
								{animalTypes.map((ele) => {
									return (
										<option key={uuidv4()}>{ele}</option>
									);
								})}
							</Select>
						</FormControl>
						<FormControl id="animal-color" isRequired>
							<FormLabel>Color</FormLabel>
							<Input
								placeholder="Animal Color"
								defaultValue={pet.color}
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
								defaultValue={pet.height}
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
								defaultValue={pet.weight}
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
								defaultValue={pet.breed}
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
								value={pet.adoption_status}
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
								isChecked={pet.hypoallergenic}
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
						<FormControl
							id="animal-dietary-restrictions"
							isRequired
						>
							<FormLabel>Dietary Restrictions</FormLabel>
							<Input
								placeholder="Animal Dietary Restrictions"
								defaultValue={pet.dietary_restrictions}
								onChange={(e) => {
									setPet({
										...pet,
										dietary_restrictions: e.target.value,
									});
								}}
							/>
						</FormControl>
						<FormControl id="animal-image">
							<FormLabel>Image</FormLabel>
							<Input
								type="file"
								onChange={(e) => {
									if (e.target.files.length === 0)
										setPetImg();
									else {
										const file = e.target.files[0];
										const formData = new FormData();
										formData.append("img", file);
										setPetImg(formData);
									}
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
							defaultValue={pet.bio}
							onChange={(e) => {
								setPet({
									...pet,
									bio: e.target.value,
								});
							}}
						/>
					</FormControl>
					<Button className="mt-3" colorScheme="blue" type="submit">
						Save Pet
					</Button>
				</form>
			)}
		</>
	);
}
