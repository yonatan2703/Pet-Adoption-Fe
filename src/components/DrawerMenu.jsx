import * as React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
import { SearchIcon, SunIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

function DrawerMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

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
							<Link to="/" className="drawer-link">
								Home
							</Link>
						</div>
						<div>
							<SearchIcon w={5} h={5} />
							<Link to="/search" className="drawer-link">
								Search
							</Link>
						</div>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default DrawerMenu;
