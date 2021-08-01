import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";

import { Redirect } from "react-router-dom";
import {} from "@chakra-ui/icons";

export default function MyPets() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userLogged, userData } = appContext;
	return (
		<>
			{!userLogged && <Redirect to="/home" />}
			<NavBar></NavBar>
			<div className="container">
				{userLogged && (
					<div className="main-title">
						Hello {userData.firstName} {userData.lastName}!
					</div>
				)}
				<div className="main-title">
					Welcome to the pet adoption agency
				</div>
				{!userLogged ? (
					<>
						<div className="second-title">
							Go agead and sign up/login to adopt your pet today
						</div>
						<div className="second-title">
							Or go ahead and use our search to find you perfect
							match first
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
