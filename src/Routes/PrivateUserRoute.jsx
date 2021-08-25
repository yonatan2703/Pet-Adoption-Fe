import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../context/AppContext";

const PrivateUserRoute = ({ component: Component, ...rest }) => {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	return (
		// Show the component only when the user is User in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				userData ? <Component {...props} /> : <Redirect to="/home" />
			}
		/>
	);
};

export default PrivateUserRoute;
