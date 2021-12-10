import { Route, Switch, Redirect } from "react-router-dom";

// components

import CheckOut from "../pages/cart/components/checkout";
import CartContext from "../context/cartContext";
import ShopContext from "../context/shopContext";
import AdminRoutes from "./admin-routes";
import {
	HomePage,
	CartPage,
	CategoryPage,
	ProductDetailPage,
	NotFoundPage,
	SecondDetailPage,
} from "../pages";

import {
	LoginPage,
	SignUpPage,
	ChangePassword,
	ForgotPassword,
} from "../pages/admin/pages";
import { CustomRoute } from "../helpers/route";

const ShopRoutes = () => {
	return (
		<div className="page-container">
			<div className="page-content">
				<Switch>
					{/* <CartContext> */}
					{/* <ShopContext> */}
					<CustomRoute
						path="/c/:category"
						exact
						component={() => <CategoryPage key={Math.random()} />}
					/>
					<Route
						path="/p/:slug"
						exact
						component={() => <ProductDetailPage key={Math.random()} />}
					/>
					<CustomRoute path="/cart" exact component={CartPage} />
					<CustomRoute path="/checkout" exact component={CheckOut} />

					{/* admin */}
					<Route path="/admin" component={AdminRoutes} />
					<CustomRoute path="/" exact component={HomePage} />

					{/* settings */}
					<Route path="/login" component={LoginPage} />
					<Route path="/change-password" component={ChangePassword} />
					<Route path="/forgot-password" component={ForgotPassword} />
					<Route path="/user-signup" component={SignUpPage} />

					{/* redirect to 404 page */}
					{/* <Route path="/not-found" component={NotFoundPage} />
							<Redirect to="/not-found" /> */}
					{/* </ShopContext> */}
					{/* </CartContext> */}
				</Switch>
			</div>
		</div>
	);
};

export default ShopRoutes;
