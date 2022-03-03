// react
import React from "react";
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightBox from "simple-react-lightbox";
// components
import ShopRoutes from "./routes/shop-routes";

// css
// import "./App.css";
import "./static/css/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "antd/";
import "antd/dist/antd.css";

// ion icon imported using a script tag in the index.html
import DakuledaErrorBoundary from "./components/errorBoundary";
import CharityAlert from "./components/charity";

function App() {
	return (
		<BrowserRouter>
			<DakuledaErrorBoundary>
				<SimpleReactLightBox>
					<CharityAlert />
					<ShopRoutes />
				</SimpleReactLightBox>
			</DakuledaErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
