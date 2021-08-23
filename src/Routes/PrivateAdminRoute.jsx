import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../context/AppContext";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
	const { useContext } = React;

	const appContext = useContext(AppContext);
	const { userData } = appContext;

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				userData && userData.role === "admin" ? (
					<Component {...props} />
				) : (
					<Redirect to="/home" />
				)
			}
		/>
	);
};

export default PrivateAdminRoute;
