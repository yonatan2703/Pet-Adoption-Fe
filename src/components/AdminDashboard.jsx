import * as React from "react";
import AppContext from "../context/AppContext";
import PetCard from "./PetCard";
import User from "./User";

import { Stack, SimpleGrid, Button } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function AdminDashboard() {
	const { useContext, useState, useEffect } = React;

	const appContext = useContext(AppContext);
	const { allPets } = appContext;

	const [allUsers, setAllUsers] = useState();

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
