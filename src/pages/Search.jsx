import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import AppContext from "../context/AppContext";
import { searchPets } from "../api/petApi";
import { useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
	const { useState, useContext, useEffect, useRef } = React;

	const appContext = useContext(AppContext);
	const { animalTypes, searchResults, setSearchResults } = appContext;

	const location = useLocation();
	const history = useHistory();

	const [searchSimple, setSearchSimple] = useState(true);

	const typeRef = useRef();
	const adoption_statusRef = useRef();
	const nameRef = useRef();
	const minHeightRef = useRef();
	const maxHeightRef = useRef();
	const minWeightRef = useRef();
	const maxWeightRef = useRef();

	const handleSearch = async () => {
		const searchParams = {};
		if (typeRef.current.value) searchParams.type = typeRef.current.value;
		if (!searchSimple) {
			if (adoption_statusRef.current.value)
				searchParams.adoption_status = adoption_statusRef.current.value;
			if (nameRef.current.value)
				searchParams.name = nameRef.current.value;
			if (minHeightRef.current.value)
				searchParams.minHeight = minHeightRef.current.value;
			if (maxHeightRef.current.value)
				searchParams.maxHeight = maxHeightRef.current.value;
			if (minWeightRef.current.value)
				searchParams.minWeight = minWeightRef.current.value;
			if (maxWeightRef.current.value)
				searchParams.maxWeight = maxWeightRef.current.value;
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
			searchPets(location.search)
				.then((res) => {
					setSearchResults(res.data);
				})
				.catch((err) => {
					console.log(err);
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
						<Select placeholder="Type of animal" ref={typeRef}>
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
									ref={adoption_statusRef}
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
									ref={nameRef}
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
										ref={minHeightRef}
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
										ref={maxHeightRef}
										max={160}
										min={5}
										defaultValue={160}
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
										ref={minWeightRef}
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
										ref={maxWeightRef}
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
				{searchResults && searchResults.length ? (
					<SimpleGrid columns={3} spacing={5}>
						{searchResults.map((ele) => {
							return (
								<PetCard
									key={uuidv4()}
									pet={ele}
									width={"100%"}
								></PetCard>
							);
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
