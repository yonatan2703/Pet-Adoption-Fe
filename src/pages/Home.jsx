import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import AdminDashboard from "../components/AdminDashboard";

import { Link } from "react-router-dom";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userLogged, userData, userAdmin } = appContext;
	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				{userLogged && (
					<div className="main-title">
						Hello {userAdmin && "Admin"} {userData.firstName}{" "}
						{userData.lastName}!
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
					<>
						<div className="mt-4">
							<SearchIcon w={5} h={5} />
							<Link to="/search" className="drawer-link">
								Search Page
							</Link>
						</div>
						<div className="">
							<ExternalLinkIcon w={5} h={5} />
							<Link to="/my-pets" className="drawer-link">
								My Pets Page
							</Link>
						</div>
						<div className="">
							<ExternalLinkIcon w={5} h={5} />
							<Link to="/add-pet" className="drawer-link">
								Add Pet Page
							</Link>
						</div>
					</>
				)}
				{userAdmin && <AdminDashboard />}
			</div>
		</>
	);
}
