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
	FormControl,
	FormLabel,
} from "@chakra-ui/react";

import { login, signUp } from "../api/userApi";
import AppContext from "../context/AppContext";

function LoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { useContext, useRef, useState } = React;

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

	const [loginError, setLoginError] = useState();
	const [signUpError, setSignUpError] = useState();

	const handleLogin = async () => {
		try {
			const res = await login({
				email: loginEmailRef.current.value,
				password: loginPasswordRef.current.value,
			});
			if (!res?.data) throw res;
			setUserData(res.data.user);
			localforage.setItem("token", res.data.token).catch(function (err) {
				// This code runs if there were any errors
				console.log(err);
			});
		} catch (err) {
			console.log(err);
			// setLoginError(<div>{err.message}</div>);
		}
	};
	const handleSignUp = async () => {
		try {
			// eslint-disable-next-line
			const res = await signUp({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				passwordValidation: passwordValidationRef.current.value,
				fName: first_nameRef.current.value,
				lName: last_nameRef.current.value,
				phone: phoneRef.current.value,
			});
			if (!res?.data) throw res;
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
								<form
									onSubmit={async (e) => {
										e.preventDefault();
										try {
											await handleLogin();
										} catch (err) {
											console.log(err);
										}
									}}
								>
									<ModalHeader className="modal-head">
										Login
									</ModalHeader>
									<ModalBody>
										<Stack
											spacing={3}
											className="mt-3 mb-3"
										>
											<FormControl isRequired>
												<FormLabel>Email</FormLabel>
												<Input
													placeholder="Email Address"
													ref={loginEmailRef}
													size="md"
													type="email"
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>Password</FormLabel>
												<PasswordInput
													text="Password"
													setRef={loginPasswordRef}
												/>
											</FormControl>
											{loginError}
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
											type="submit"
										>
											LOGIN
										</Button>
									</ModalFooter>
								</form>
							</TabPanel>
							<TabPanel>
								<form
									onSubmit={async (e) => {
										e.preventDefault();
										try {
											await handleSignUp();
										} catch (err) {}
									}}
								>
									<ModalHeader className="modal-head">
										Sign Up
									</ModalHeader>
									<ModalBody>
										<Stack
											spacing={3}
											className="mt-3 mb-3"
										>
											<FormControl isRequired>
												<FormLabel>Email</FormLabel>
												<Input
													placeholder="Email Address"
													ref={emailRef}
													size="md"
													type="email"
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>Password</FormLabel>
												<PasswordInput
													text="Password"
													setRef={passwordRef}
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>
													Repeat Password
												</FormLabel>
												<PasswordInput
													text="Repeat Password"
													setRef={
														passwordValidationRef
													}
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>
													First Name
												</FormLabel>
												<Input
													placeholder="First Name"
													ref={first_nameRef}
													size="md"
													type="text"
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>Last Name</FormLabel>
												<Input
													placeholder="Last Name"
													ref={last_nameRef}
													size="md"
													type="text"
												/>
											</FormControl>
											<FormControl isRequired>
												<FormLabel>
													Phone Number
												</FormLabel>
												<Input
													placeholder="Phone Number"
													ref={phoneRef}
													size="md"
													type="phone"
												/>
											</FormControl>
											{signUpError}
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
											type="submit"
										>
											SIGN UP
										</Button>
									</ModalFooter>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalContent>
			</Modal>
		</>
	);
}

export default LoginModal;
