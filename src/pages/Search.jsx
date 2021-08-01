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
} from "@chakra-ui/react";

export default function Search() {
	const { useState, useContext } = React;

	const appContext = useContext(AppContext);
	// eslint-disable-next-line
	const { allPets } = appContext;

	const [searchSimple, setSearchSimple] = useState(true);
	const [searchResults, setSearchResults] = useState();

	// eslint-disable-next-line
	const [animalTypes, setAnimalTypes] = useState([
		"Dog",
		"Cat",
		"Fish",
		"Hamster",
		"Turtle",
	]);

	const handleSearch = () => {
		console.log("Searching...");
		setSearchResults(allPets);
		console.log(searchResults);
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
						<Select placeholder="Type of animal">
							{animalTypes.map((ele) => {
								return <option>{ele}</option>;
							})}
						</Select>
					</FormControl>
					{!searchSimple && (
						<>
							<FormControl id="adoption-status">
								<FormLabel>Adoption status</FormLabel>
								<Select placeholder="Adoption status">
									<option>Adopted</option>
									<option>Fostered</option>
									<option>Null</option>
								</Select>
							</FormControl>
							<FormControl id="animal-name">
								<FormLabel>Name</FormLabel>
								<Input placeholder="Animal name" />
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
										defaultValue={150}
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
				<div className="search-results">
					{searchResults &&
						searchResults.length &&
						searchResults.map((ele) => {
							return <PetCard pet={ele} width={"50%"}></PetCard>;
						})}
				</div>
			</div>
		</>
	);
}
