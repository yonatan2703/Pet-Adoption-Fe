import * as React from "react";
import PasswordInput from "./PasswordInput";

import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Stack,
	Input,
} from "@chakra-ui/react";

function LoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen} className="prussian-blue-bc me-3">
				LOGIN
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Tabs>
						<TabList className="prussian-blue-bc">
							<Tab className="modal-tab">Login</Tab>
							<Tab className="modal-tab">Sign Up</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<ModalHeader className="modal-head">
									Login
								</ModalHeader>
								<ModalBody>
									<Stack spacing={3} className="mt-3 mb-3">
										<Input
											placeholder="Email Address"
											size="md"
											type="email"
										/>
										<PasswordInput text="Password" />
									</Stack>
								</ModalBody>

								<ModalFooter>
									<Button
										variant="ghost"
										mr={3}
										onClick={onClose}
									>
										Close
									</Button>
									<Button colorScheme="blue">LOGIN</Button>
								</ModalFooter>
							</TabPanel>
							<TabPanel>
								<ModalHeader className="modal-head">
									Sign Up
								</ModalHeader>
								<ModalBody>
									<Stack spacing={3} className="mt-3 mb-3">
										<Input
											placeholder="Email Address"
											size="md"
											type="email"
										/>
										<PasswordInput text="Password" />
										<PasswordInput text="Retype Password" />
										<Input
											placeholder="First Name"
											size="md"
											type="text"
										/>
										<Input
											placeholder="Last Name"
											size="md"
											type="text"
										/>
										<Input
											placeholder="Phone Number"
											size="md"
											type="tel"
										/>
									</Stack>
								</ModalBody>

								<ModalFooter>
									<Button
										variant="ghost"
										mr={3}
										onClick={onClose}
									>
										Close
									</Button>
									<Button colorScheme="blue">SIGN UP</Button>
								</ModalFooter>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalContent>
			</Modal>
		</>
	);
}

export default LoginModal;
