import * as React from "react";
import PasswordInput from "./PasswordInput";
import localforage from "localforage";

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

import { login, signUp } from "../api/userApi";
import AppContext from "../context/AppContext";

function LoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { useState, useContext } = React;

	const appContext = useContext(AppContext);
	const { setUserData } = appContext;

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordValidation, setPasswordValidation] = useState();
	const [first_name, setFirstName] = useState();
	const [last_name, setLastName] = useState();
	const [phone, setPhone] = useState();

	const handleLogin = async () => {
		const res = await login({
			email: email,
			password: password,
		});
		setUserData(res.data.user);
		localforage
			.setItem("token", res.data.token)
			.then(function (value) {
				// Do other things once the value has been saved.
				console.log(value);
			})
			.catch(function (err) {
				// This code runs if there were any errors
				console.log(err);
			});
	};
	const handleSignUp = async () => {
		const res = await signUp({
			email: email,
			password: password,
			passwordValidation: passwordValidation,
			fName: first_name,
			lName: last_name,
			phone: phone,
		});
		console.log(res);
	};

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
							<Tab
								className="modal-tab"
								onClick={() => {
									setPassword();
									setPasswordValidation();
								}}
							>
								Login
							</Tab>
							<Tab
								className="modal-tab"
								onClick={() => {
									setPassword();
									setPasswordValidation();
								}}
							>
								Sign Up
							</Tab>
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
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
										<PasswordInput
											text="Password"
											setPassword={setPassword}
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
									<Button
										colorScheme="blue"
										onClick={async () => {
											try {
												await handleLogin();
											} catch (err) {}
										}}
									>
										LOGIN
									</Button>
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
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
										<PasswordInput
											text="Password"
											setPassword={setPassword}
										/>
										<PasswordInput
											text="Retype Password"
											setPassword={setPasswordValidation}
										/>
										<Input
											placeholder="First Name"
											size="md"
											type="text"
											onChange={(e) => {
												setFirstName(e.target.value);
											}}
										/>
										<Input
											placeholder="Last Name"
											size="md"
											type="text"
											onChange={(e) => {
												setLastName(e.target.value);
											}}
										/>
										<Input
											placeholder="Phone Number"
											size="md"
											type="tel"
											onChange={(e) => {
												setPhone(e.target.value);
											}}
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
									<Button
										colorScheme="blue"
										onClick={async () => {
											try {
												await handleSignUp();
											} catch (err) {}
										}}
									>
										SIGN UP
									</Button>
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
