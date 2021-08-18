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

import { savedPetsArray } from "./lib/mockData";
import { loginOnLoad } from "./api/userApi";

function App() {
	const { useState, useEffect } = React;

	const [userData, setUserData] = useState();
	const [savedPets, setSavedPets] = useState(savedPetsArray);
	const [togglePets, setTogglePets] = useState(true);
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
					return console.log(err);
				}
				if (value) {
					axios.defaults.headers.common["Authorization"] = value;
					const user = await loginOnLoad();
					console.log(user);
					if (user) {
						setUserData(user.data.user);
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
					savedPets: savedPets,
					setSavedPets: setSavedPets,
					togglePets: togglePets,
					setTogglePets: setTogglePets,
					animalTypes: animalTypes,
					setAnimalTypes: setAnimalTypes,
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
						<Route exact path="/my-pets">
							<MyPets />
						</Route>
						<Route exact path="/profile-settings">
							<ProfileSettings />
						</Route>
						<Route exact path="/pet-page/:id">
							<PetPage />
						</Route>
						<Route exact path="/add-pet">
							<AdminAddPet />
						</Route>
						<Route exact path="/user/:id">
							<UserPage />
						</Route>
						<Route exact path="/edit-pet/:id">
							<EditPet />
						</Route>
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
