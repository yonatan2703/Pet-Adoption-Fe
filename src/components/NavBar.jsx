import * as React from "react";
import DrawerMenu from "./DrawerMenu";
import LoginModal from "./LoginModal";

export default function NavBar() {
	return (
		<div className="navbar prussian-blue-bc">
			<DrawerMenu></DrawerMenu>
			<LoginModal></LoginModal>
		</div>
	);
}
