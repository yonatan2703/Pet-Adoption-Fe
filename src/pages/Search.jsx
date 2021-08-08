import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import AppContext from "../context/AppContext";

import {
	Button,
	FormControl,
	FormLabel,
	Select,
	Stack,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	SimpleGrid,
} from "@chakra-ui/react";

export default function Search() {
	const { useState, useContext } = React;

	const appContext = useContext(AppContext);
	// eslint-disable-next-line
	const { allPets, animalTypes } = appContext;

	const [searchSimple, setSearchSimple] = useState(true);
	const [searchResults, setSearchResults] = useState();

	const [petType, setPetType] = useState();
	const [petAdoptionStatus, setPetAdoptionStatus] = useState();
	const [petName, setPetName] = useState();
	const [petMinHeight, setPetMinHeight] = useState();
	const [petMaxHeight, setPetMaxHeight] = useState();
	const [petMinWeight, setPetMinWeight] = useState();
	const [petMaxWeight, setPetMaxWeight] = useState();

	const handleSearch = () => {
		const query = { type: petType };
		if (!searchSimple) {
			query.adoptionStat = petAdoptionStatus;
			query.name = petName;
			query.minHeight = petMinHeight;
			query.maxHeight = petMaxHeight;
			query.minWeight = petMinWeight;
			query.maxWeight = petMaxWeight;
		}
		setSearchResults(allPets);
	};

	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				<Button
					className="mb-3 mt-3"
					onClick={() => setSearchSimple(!searchSimple)}
				>
					{searchSimple ? "Advanced Search" : "Simple Search"}
				</Button>

				<Stack spacing={3} className="mb-3">
					<FormControl id="animal-type">
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
					{!searchSimple && (
						<>
							<FormControl id="adoption-status">
								<FormLabel>Adoption status</FormLabel>
								<Select
									placeholder="Adoption status"
									onChange={(e) => {
										setPetAdoptionStatus(e.target.value);
									}}
								>
									<option>Adopted</option>
									<option>Fostered</option>
									<option>Null</option>
								</Select>
							</FormControl>
							<FormControl id="animal-name">
								<FormLabel>Name</FormLabel>
								<Input
									placeholder="Animal name"
									onChange={(e) => {
										setPetName(e.target.value);
									}}
								/>
							</FormControl>
							<Stack
								spacing={3}
								direction="row"
								id="animal-height"
							>
								<FormControl id="min-height">
									<FormLabel>Min height in CM</FormLabel>
									<NumberInput
										max={160}
										min={5}
										defaultValue={5}
										onChange={(e) => {
											setPetMinHeight(e);
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<FormControl id="max-height">
									<FormLabel>Max height in CM</FormLabel>
									<NumberInput
										max={160}
										min={5}
										defaultValue={160}
										onChange={(e) => {
											setPetMaxHeight(e);
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Stack>
							<Stack
								spacing={3}
								direction="row"
								id="animal-weight"
							>
								<FormControl id="min-weight">
									<FormLabel>Min weight in KG</FormLabel>
									<NumberInput
										max={100}
										min={5}
										defaultValue={5}
										onChange={(e) => {
											setPetMinWeight(e);
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<FormControl id="max-weight">
									<FormLabel>Max weight in KG</FormLabel>
									<NumberInput
										max={100}
										min={5}
										defaultValue={100}
										onChange={(e) => {
											setPetMaxWeight(e);
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Stack>
						</>
					)}
				</Stack>
				<Button
					colorScheme="blue"
					onClick={() => {
						handleSearch();
					}}
				>
					Search
				</Button>
				{searchResults && searchResults.length && (
					<SimpleGrid columns={3} spacing={5}>
						{searchResults.map((ele) => {
							return <PetCard pet={ele} width={"100%"}></PetCard>;
						})}
					</SimpleGrid>
				)}
			</div>
		</>
	);
}
