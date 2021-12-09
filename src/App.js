// react
import React from "react";
import { BrowserRouter } from "react-router-dom";

// components
import ShopRoutes from "./routes/shop-routes";

// css
// import "./App.css";
import "./static/css/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// ion icon imported using a script tag in the index.html
import DakuledaErrorBoundary from "./components/errorBoundary";

function App() {
	return (
		<BrowserRouter>
			<DakuledaErrorBoundary>
				<ShopRoutes />
			</DakuledaErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
