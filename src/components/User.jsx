import * as React from "react";
import { Link } from "react-router-dom";

export default function User(props) {
	const { user } = props;

	return (
		<>
			<Link to={`/user${user.id}`}>
				{user.firstName} {user.lastName}
			</Link>
		</>
	);
}
