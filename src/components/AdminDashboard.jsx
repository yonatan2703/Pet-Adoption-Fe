import * as React from "react";
import PetCard from "./PetCard";
import User from "./User";
import AppContext from "../context/AppContext";
import { searchPets } from "../api/petApi";
import { getAllUsers } from "../api/userApi";

import { v4 as uuidv4 } from "uuid";
import { Stack, SimpleGrid, Box } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

export default function AdminDashboard() {
	const { useState, useEffect, useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	const [allUsers, setAllUsers] = useState();
	const [allPets, setAllPets] = useState();

	useEffect(() => {
		if (userData) {
			getAllUsers()
				.then((res) => {
					setAllUsers(res?.data);
				})
				.catch((err) => {
					console.log(err);
				});
			searchPets("")
				.then((res) => {
					setAllPets(res?.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userData]);

	return (
		<>
			{allUsers && (
				<>
					<div className="second-title mt-3">All Users Table</div>
					<Stack className="user-table mt-1">
						<div className="user-table-ele user-table-title">
							<Box className="user-table-ele-child user-id">
								ID
							</Box>
							<Box className="user-table-ele-child user-first-name">
								First Name
							</Box>
							<Box className="user-table-ele-child user-last-name">
								Last Name
							</Box>
							<Box className="user-table-ele-child user-email">
								Email
							</Box>
							<Box className="user-table-ele-child user-phone">
								Phone
							</Box>
							<Box className="user-table-ele-child user-role">
								Role
							</Box>
							<Box className="user-table-ele-child user-link">
								Link To User
							</Box>
							<Box className=" user-table-ele-child user-button">
								Change Role
							</Box>
						</div>
						{allUsers.map((ele) => {
							return <User key={uuidv4()} user={ele}></User>;
						})}
					</Stack>
				</>
			)}
			{allPets && (
				<>
					<div className="second-title mt-3">All Pets Grid</div>
					<SimpleGrid columns={3} spacing={5}>
						{allPets.map((ele) => {
							return (
								<PetCard
									key={uuidv4()}
									pet={ele}
									width={"100%"}
									edit={true}
								></PetCard>
							);
						})}
					</SimpleGrid>
				</>
			)}
		</>
	);
}
