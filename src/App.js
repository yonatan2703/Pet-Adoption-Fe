import "./App.css";
import * as React from "react";
// eslint-disable-next-line
import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import axios from "axios";
import localforage from "localforage";

import AppContext from "./context/AppContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MyPets from "./pages/MyPets";
import PetPage from "./pages/PetPage";
import ProfileSettings from "./pages/ProfileSettings";
import AdminAddPet from "./pages/AdminAddPet";
import EditPet from "./pages/EditPet";
import UserPage from "./pages/UserPage";
import PrivateAdminRoute from "./Routes/PrivateAdminRoute.jsx";
import PrivateUserRoute from "./Routes/PrivateUserRoute.jsx";

import { loginOnLoad } from "./api/userApi";
function App() {
	require("dotenv").config();
	const { useState, useEffect } = React;

	const [userData, setUserData] = useState();
	const [togglePets, setTogglePets] = useState(true);
	const [searchResults, setSearchResults] = useState();
	const [animalTypes, setAnimalTypes] = useState([
		"Dog",
		"Cat",
		"Fish",
		"Hamster",
		"Turtle",
	]);

	useEffect(() => {
		try {
			localforage.getItem("token", async (err, value) => {
				if (err) {
					return err;
				}
				if (value) {
					axios.defaults.headers.common["Authorization"] = value;
					const user = await loginOnLoad();
					if (user?.data) {
						setUserData(user?.data?.user);
					}
				}
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<ChakraProvider>
			<AppContext.Provider
				value={{
					userData: userData,
					setUserData: setUserData,
					togglePets: togglePets,
					setTogglePets: setTogglePets,
					animalTypes: animalTypes,
					setAnimalTypes: setAnimalTypes,
					searchResults: searchResults,
					setSearchResults: setSearchResults,
				}}
			>
				<Router>
					<Switch>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/search">
							<Search />
						</Route>
						<Route exact path="/pet-page/:id">
							<PetPage />
						</Route>
						<PrivateUserRoute
							component={MyPets}
							path="/my-pets"
							exact
						/>
						<PrivateUserRoute
							component={ProfileSettings}
							path="/profile-settings"
							exact
						/>
						<PrivateAdminRoute
							component={AdminAddPet}
							path="/add-pet"
							exact
						/>
						<PrivateAdminRoute
							component={UserPage}
							path="/user/:id"
							exact
						/>
						<PrivateAdminRoute
							component={EditPet}
							path="/edit-pet/:id"
							exact
						/>
						<Route from="" to="/home">
							<Redirect to="/home"></Redirect>
						</Route>
					</Switch>
				</Router>
			</AppContext.Provider>
		</ChakraProvider>
	);
}

export default App;
