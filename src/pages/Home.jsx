import * as React from "react";
import NavBar from "../components/NavBar";

export default function Home() {
	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				<div className="main-title">
					Welcome to the pet adoption agency
				</div>
				<div className="second-title">
					Go agead and sign up/login to adopt your pet today
				</div>
				<div className="second-title">
					Or go ahead and use our search to find you perfect match
					first
				</div>
			</div>
		</>
	);
}
