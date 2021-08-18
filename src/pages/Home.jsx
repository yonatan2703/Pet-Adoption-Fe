import * as React from "react";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import AdminDashboard from "../components/AdminDashboard";

import { Link } from "react-router-dom";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;
	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				{userData && (
					<div className="main-title">
						Hello {userData?.role === "admin" && "Admin"}{" "}
						{userData.first_name} {userData.last_name}!
					</div>
				)}
				<div className="main-title">
					Welcome to the pet adoption agency
				</div>
				{!userData ? (
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
						{userData?.role === "admin" && (
							<div className="">
								<ExternalLinkIcon w={5} h={5} />
								<Link to="/add-pet" className="drawer-link">
									Add Pet Page
								</Link>
							</div>
						)}
					</>
				)}
				{userData?.role === "admin" && <AdminDashboard />}
			</div>
		</>
	);
}
