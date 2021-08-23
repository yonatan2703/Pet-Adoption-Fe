import * as React from "react";
import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import AppContext from "../context/AppContext";
import { getMyPets } from "../api/userApi";

import { v4 as uuidv4 } from "uuid";
import { Button, SimpleGrid } from "@chakra-ui/react";

export default function MyPets() {
	const { useState, useContext, useEffect } = React;

	const appContext = useContext(AppContext);
	const { userData, togglePets, setTogglePets } = appContext;
	const [savedPets, setSavedPets] = useState();
	const [ownedPets, setOwnedPets] = useState();

	useEffect(() => {
		if (userData) {
			getMyPets(userData.user_id)
				.then((res) => {
					setOwnedPets(res.data.ownedPets);
					setSavedPets(res.data.savedPets);
				})
				.catch((err) => {
					console.log(err);
				});
		} // eslint-disable-next-line
	}, []);

	return (
		<>
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
					ownedPets && ownedPets.length ? (
						<SimpleGrid columns={4} spacing={5}>
							{ownedPets.map((ele, i) => {
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
						<div className="h1">
							You currently do not own or foster any pets.
						</div>
					)
				) : savedPets && savedPets.length ? (
					<SimpleGrid columns={4} spacing={5}>
						{savedPets.map((ele) => {
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
					<div className="h1">
						You currently do not have any saved pets.
					</div>
				)}
			</div>
		</>
	);
}
