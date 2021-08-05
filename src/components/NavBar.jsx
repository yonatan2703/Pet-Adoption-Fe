import * as React from "react";
import DrawerMenu from "./DrawerMenu";
import LoginModal from "./LoginModal";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";

import { Button } from "@chakra-ui/react";

export default function NavBar() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { setUserLogged, userLogged, setUserAdmin } = appContext;

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
			{userLogged ? (
				<Button
					className="prussian-blue-bc me-3"
					onClick={() => {
						setUserLogged(false);
						setUserAdmin(false);
					}}
				>
					Logout
				</Button>
			) : (
				<div>
					<LoginModal></LoginModal>
					<Button
						className="prussian-blue-bc me-3"
						onClick={() => {
							setUserLogged(true);
							setUserAdmin(true);
						}}
					>
						Auto Login
					</Button>
				</div>
			)}
		</div>
	);
}
