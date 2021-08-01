import * as React from "react";
import NavBar from "../components/NavBar";

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
	const { useState } = React;

	const [search, setSearch] = useState(true);
	const [animalTypes, setAnimalTypes] = useState([
		"Dog",
		"Cat",
		"Fish",
		"Hamster",
		"Turtle",
	]);

	const handleSearch = () => {
		console.log("Searching...");
	};

	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				<Button
					className="mb-3 mt-3"
					onClick={() => setSearch(!search)}
				>
					{search ? "Advanced Search" : "Simple Search"}
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
					{!search && (
						<>
							<FormControl id="adoption-status">
								<FormLabel>Adoption status</FormLabel>
								<Select placeholder="Adoption status">
									<option>Adopted</option>
									<option>Fostered</option>
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
										max={150}
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
										max={150}
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
			</div>
		</>
	);
}
