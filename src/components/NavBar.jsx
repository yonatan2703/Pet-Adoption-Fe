import * as React from "react";
import DrawerMenu from "./DrawerMenu";
import LoginModal from "./LoginModal";
import AppContext from "../context/AppContext";
import localforage from "localforage";
import { useLocation } from "react-router-dom";

import { Button } from "@chakra-ui/react";

export default function NavBar() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { setUserData, userData } = appContext;

	let location = useLocation();

	const getPageNameFromUrl = () => {
		const words = location.pathname.slice(1).split("-");
		const pageName = words
			.map((word) => {
				return word[0].toUpperCase() + word.substring(1);
			})
			.join(" ");
		return pageName;
	};

	return (
		<div className="navbar prussian-blue-bc">
			<DrawerMenu></DrawerMenu>
			<div className="h3">{getPageNameFromUrl()} Page</div>
			{userData ? (
				<Button
					className="prussian-blue-bc me-3"
					onClick={() => {
						setUserData();
						localforage
							.setItem("token", "")
							.then(function (value) {
								// Do other things once the value has been saved.
								console.log(value);
							})
							.catch(function (err) {
								// This code runs if there were any errors
								console.log(err);
							});
						window.location.reload();
					}}
				>
					Logout
				</Button>
			) : (
				<LoginModal></LoginModal>
			)}
		</div>
	);
}
