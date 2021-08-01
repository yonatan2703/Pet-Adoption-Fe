import * as React from "react";
import AppContext from "../context/AppContext";

import { Button, InputGroup, Input, InputRightElement } from "@chakra-ui/react";

function PasswordInput(props) {
	const { useContext, useState } = React;

	const appContext = useContext(AppContext);
	const { setPassword } = appContext;

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { text } = props;

	return (
		<InputGroup size="md">
			<Input
				pr="4.5rem"
				type={show ? "text" : "password"}
				placeholder={text}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<InputRightElement width="4.5rem">
				<Button h="1.75rem" size="sm" onClick={handleClick}>
					{show ? "Hide" : "Show"}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

export default PasswordInput;
