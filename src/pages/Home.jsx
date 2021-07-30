import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import DrawerMenu from "../components/DrawerMenu";
import LoginModal from "../components/LoginModal";

export default function Home() {
	return (
		<ChakraProvider>
			<div className="navbar prussian-blue-bc">
				<DrawerMenu></DrawerMenu>
				<LoginModal></LoginModal>
			</div>
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
		</ChakraProvider>
	);
}
