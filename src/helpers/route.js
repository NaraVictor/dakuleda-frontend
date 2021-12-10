import { Route } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { Redirect } from "react-router-dom";
import NavBar from "./../components/nav/navbar";
import SubNav from "./../components/nav/subNav";
import Footer from "./../components/footer";

function CustomRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => (
				<>
					<NavBar />
					<SubNav />
					<Component {...props} />
					<Footer />
				</>
			)}
		/>
	);
}

function AdminRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export { AdminRoute, CustomRoute };
