import * as React from "react";
import PetCard from "./PetCard";
import User from "./User";
import { searchPets } from "../api/petApi";

import { Stack, SimpleGrid } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function AdminDashboard() {
	const { useState, useEffect } = React;

	const [allUsers, setAllUsers] = useState();
	const [allPets, setAllPets] = useState();

	useEffect(() => {
		searchPets("").then((res) => {
			console.log(res.data);
			setAllPets(res.data);
		});
		setAllUsers();
	}, []);

	return (
		<>
			{allUsers && (
				<Stack>
					{allUsers.map((ele) => {
						return <User user={ele}></User>;
					})}
				</Stack>
			)}
			{allPets && (
				<SimpleGrid columns={3} spacing={5}>
					{allPets.map((ele) => {
						return (
							<PetCard
								pet={ele}
								width={"100%"}
								edit={true}
							></PetCard>
						);
					})}
				</SimpleGrid>
			)}
		</>
	);
}
