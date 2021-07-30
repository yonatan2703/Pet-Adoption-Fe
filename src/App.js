import "./App.css";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
	return (
		<ChakraProvider>
			<Router>
				<div>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/search">
							<Search />
						</Route>
					</Switch>
				</div>
			</Router>
		</ChakraProvider>
	);
}

export default App;
