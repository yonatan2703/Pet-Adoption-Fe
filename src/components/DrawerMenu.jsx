import * as React from "react";
import AppContext from "../context/AppContext";

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	useDisclosure,
} from "@chakra-ui/react";
import {
	SearchIcon,
	SunIcon,
	HamburgerIcon,
	ExternalLinkIcon,
	SettingsIcon,
} from "@chakra-ui/icons";

import { Link } from "react-router-dom";

function DrawerMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	return (
		<>
			<Button
				ref={btnRef}
				onClick={onOpen}
				className="prussian-blue-bc ms-2"
			>
				<HamburgerIcon w={6} h={6} />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent className="drawer-cont">
					<DrawerHeader className="drawer-head prussian-blue-bc">
						Menu
					</DrawerHeader>

					<DrawerBody className="links-cont">
						<div>
							<SunIcon w={5} h={5} />
							<Link to="/home" className="drawer-link">
								Home
							</Link>
						</div>
						<div>
							<SearchIcon w={5} h={5} />
							<Link to="/search" className="drawer-link">
								Search
							</Link>
						</div>
						{userData && (
							<div>
								<ExternalLinkIcon w={5} h={5} />
								<Link to="/my-pets" className="drawer-link">
									My Pets
								</Link>
							</div>
						)}
						{userData?.role === "admin" && (
							<div>
								<ExternalLinkIcon w={5} h={5} />
								<Link to="/add-pet" className="drawer-link">
									Add Pet
								</Link>
							</div>
						)}
					</DrawerBody>

					<DrawerFooter>
						{userData && (
							<>
								<SettingsIcon w={5} h={5} />
								<Link
									to="/profile-settings"
									className="drawer-link"
								>
									Profile Settings
								</Link>
							</>
						)}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default DrawerMenu;
