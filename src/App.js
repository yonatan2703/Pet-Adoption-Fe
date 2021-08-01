import "./App.css";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ChakraProvider } from "@chakra-ui/react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import AppContext from "./context/AppContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MyPets from "./pages/MyPets";
import PetPage from "./pages/PetPage";
import ProfileSettings from "./pages/ProfileSettings";

import { myPetsArray, savedPetsArray, allPetsArray } from "./lib/mockData";

function App() {
	const { useState } = React;

	const defaultUser = {
		// id: uuidv4(),
		id: "some_id",
		email: "email&gmail.com",
		password: "12345678",
		firstName: "FirstNa",
		lastName: "LastNa",
		phoneNumber: "0501234567",
		bio: "my bio",
		admin: false,
	};

	const [userData, setUserData] = useState(defaultUser);
	const [userLogged, setUserLogged] = useState(false);
	const [password, setPassword] = useState(defaultUser.password);
	const [savedPets, setSavedPets] = useState(savedPetsArray);
	const [myPets, setMyPets] = useState(myPetsArray);
	const [allPets, setAllPets] = useState(allPetsArray);
	const [togglePets, setTogglePets] = useState(true);

	return (
		<ChakraProvider>
			<AppContext.Provider
				value={{
					userData: userData,
					setUserData: setUserData,
					userLogged: userLogged,
					setUserLogged: setUserLogged,
					password: password,
					setPassword: setPassword,
					savedPets: savedPets,
					setSavedPets: setSavedPets,
					myPets: myPets,
					setMyPets: setMyPets,
					allPets: allPets,
					togglePets: togglePets,
					setTogglePets: setTogglePets,
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
					</Switch>
					<Redirect from="/" to="/home" />
				</Router>
			</AppContext.Provider>
		</ChakraProvider>
	);
}

export default App;
