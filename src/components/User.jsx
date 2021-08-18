import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";
import AppContext from "../context/AppContext";

import { unAdmin, makeAdmin } from "../api/userApi";

export default function User(props) {
	const { user } = props;
	const { useState, useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	const [userRole, setUserRole] = useState(user.role);

	return (
		<div className="user-table-ele">
			<Box className="user-table-ele-child user-id">{user.user_id}</Box>
			<Box className="user-table-ele-child user-first-name">
				{user.first_name}
			</Box>
			<Box className="user-table-ele-child user-last-name">
				{user.last_name}
			</Box>
			<Box className="user-table-ele-child user-email">{user.email}</Box>
			<Box className="user-table-ele-child user-phone">{user.phone}</Box>
			<Box className="user-table-ele-child user-role">{userRole}</Box>
			<Link
				to={`/user/${user.user_id}`}
				className="user-table-ele-child user-link chakra-button css-f6n2t5"
			>
				User's Page
			</Link>
			<Button
				disabled={userData.user_id === user.user_id}
				colorScheme="teal"
				className=" user-table-ele-child user-button"
				onClick={() => {
					if (userRole === "admin") {
						unAdmin(user.user_id)
							.then((res) => {
								console.log(res);
								setUserRole("user");
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						makeAdmin(user.user_id)
							.then((res) => {
								console.log(res);
								setUserRole("admin");
							})
							.catch((err) => {
								console.log(err);
							});
					}
				}}
			>
				{userRole === "admin" ? "UnAdmin User" : "Make Admin"}
			</Button>
		</div>
	);
}
