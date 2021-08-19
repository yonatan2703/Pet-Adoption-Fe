import * as React from "react";

import { Button, InputGroup, Input, InputRightElement } from "@chakra-ui/react";

function PasswordInput(props) {
	const { useState } = React;

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { text, setRef } = props;

	return (
		<InputGroup size="md">
			<Input
				pr="4.5rem"
				type={show ? "text" : "password"}
				placeholder={text}
				ref={setRef}
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
