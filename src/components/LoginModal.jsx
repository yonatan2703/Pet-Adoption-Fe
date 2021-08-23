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
	const { useContext, useRef } = React;

	const appContext = useContext(AppContext);
	const { setUserData } = appContext;

	const loginEmailRef = useRef();
	const loginPasswordRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordValidationRef = useRef();
	const first_nameRef = useRef();
	const last_nameRef = useRef();
	const phoneRef = useRef();

	const handleLogin = async () => {
		const res = await login({
			email: loginEmailRef.current.value,
			password: loginPasswordRef.current.value,
		});
		setUserData(res.data.user);
		localforage.setItem("token", res.data.token).catch(function (err) {
			// This code runs if there were any errors
			console.log(err);
		});
	};
	const handleSignUp = async () => {
		try {
			const res = await signUp({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				passwordValidation: passwordValidationRef.current.value,
				fName: first_nameRef.current.value,
				lName: last_nameRef.current.value,
				phone: phoneRef.current.value,
			});
		} catch (err) {
			console.log(err);
		}
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
											ref={loginEmailRef}
											size="md"
											type="email"
										/>
										<PasswordInput
											text="Password"
											setRef={loginPasswordRef}
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
											} catch (err) {
												console.log(err);
											}
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
											ref={emailRef}
											size="md"
											type="email"
										/>
										<PasswordInput
											text="Password"
											setRef={passwordRef}
										/>
										<PasswordInput
											text="Retype Password"
											setRef={passwordValidationRef}
										/>
										<Input
											placeholder="First Name"
											ref={first_nameRef}
											size="md"
											type="text"
										/>
										<Input
											placeholder="Last Name"
											ref={last_nameRef}
											size="md"
											type="text"
										/>
										<Input
											placeholder="Phone Number"
											ref={phoneRef}
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
