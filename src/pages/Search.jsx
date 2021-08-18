import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import AppContext from "../context/AppContext";
import { searchPets } from "../api/petApi";
import { useHistory, useLocation } from "react-router-dom";

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
	const { useState, useContext, useEffect } = React;

	const appContext = useContext(AppContext);
	const { animalTypes } = appContext;

	const location = useLocation();
	const history = useHistory();

	const [searchSimple, setSearchSimple] = useState(true);
	const [searchResults, setSearchResults] = useState();

	const [type, setType] = useState();
	const [adoption_status, setAdoption_status] = useState();
	const [name, setName] = useState();
	const [minHeight, setMinHeight] = useState(5);
	const [maxHeight, setMaxHeight] = useState(160);
	const [minWeight, setMinWeight] = useState(5);
	const [maxWeight, setMaxWeight] = useState(100);

	const handleSearch = async () => {
		const searchParams = {};
		if (type) searchParams.type = type;
		if (!searchSimple) {
			if (adoption_status) searchParams.adoption_status = adoption_status;
			if (name) searchParams.name = name;
			if (minHeight) searchParams.minHeight = minHeight;
			if (maxHeight) searchParams.maxHeight = maxHeight;
			if (minWeight) searchParams.minWeight = minWeight;
			if (maxWeight) searchParams.maxWeight = maxWeight;
		}
		const query = "?" + new URLSearchParams(searchParams).toString();
		history.push({
			pathname: "/search",
			search: query,
		});
		const res = await searchPets(query);
		console.log(res.data);
		setSearchResults(res.data);
	};

	useEffect(() => {
		if (location.search) {
			searchPets(location.search).then((res) => {
				setSearchResults(res.data);
			});
		}
		// eslint-disable-next-line
	}, []);

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
								setType(e.target.value);
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
										setAdoption_status(e.target.value);
									}}
								>
									<option>Adopted</option>
									<option>Fostered</option>
									<option>Available</option>
								</Select>
							</FormControl>
							<FormControl id="animal-name">
								<FormLabel>Name</FormLabel>
								<Input
									placeholder="Animal name"
									onChange={(e) => {
										setName(e.target.value);
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
											setMinHeight(e);
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
											setMaxHeight(e);
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
											setMinWeight(e);
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
											setMaxWeight(e);
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
				{searchResults && searchResults.length ? (
					<SimpleGrid columns={3} spacing={5}>
						{searchResults.map((ele) => {
							return <PetCard pet={ele} width={"100%"}></PetCard>;
						})}
					</SimpleGrid>
				) : (
					searchResults &&
					searchResults.length === 0 &&
					"No search results"
				)}
			</div>
		</>
	);
}
