import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import AppContext from "../context/AppContext";

import { Redirect } from "react-router-dom";
import { Button, SimpleGrid } from "@chakra-ui/react";

export default function MyPets() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userData, myPets, savedPets, togglePets, setTogglePets } =
		appContext;

	return (
		<>
			{!userData && <Redirect from="" to="/home" />}
			<NavBar></NavBar>
			<div className="container">
				<Button
					colorScheme="blue"
					onClick={() => {
						setTogglePets(!togglePets);
					}}
					className="mt-3"
				>
					{togglePets ? "Show My Saved Pets" : "Show My Pets"}
				</Button>
				{togglePets ? (
					myPets && myPets.length ? (
						<SimpleGrid columns={4} spacing={5}>
							{myPets.map((ele) => {
								return (
									<PetCard pet={ele} width={"100%"}></PetCard>
								);
							})}
						</SimpleGrid>
					) : (
						<div className="h1">
							You currently do not own or foster any pets.
						</div>
					)
				) : savedPets && savedPets.length ? (
					<SimpleGrid columns={4} spacing={5}>
						{savedPets.map((ele) => {
							return <PetCard pet={ele} width={"100%"}></PetCard>;
						})}
					</SimpleGrid>
				) : (
					<div className="h1">
						You currently do not have any saved pets.
					</div>
				)}
			</div>
		</>
	);
}
