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
	ShowRoomsPage,
	GiftsPage,
	AboutPage,
} from "../pages";

import {
	LoginPage,
	SignUpPage,
	ChangePassword,
	ForgotPassword,
} from "../pages/admin/pages";
import { CustomRoute, NormalRoute } from "../helpers/route";

const ShopRoutes = () => {
	return (
		// <div className="page-container">
		// <div className="content-wrapper">
		<Switch>
			<CartContext>
				<ShopContext>
					<CustomRoute
						path="/c/:slug"
						exact
						component={() => <CategoryPage key={Math.random()} />}
					/>
					<CustomRoute
						path="/p/:slug"
						key={Math.random()}
						exact
						component={() => <ProductDetailPage key={Math.random()} />}
					/>
					{/* <CustomRoute path="/cart" exact component={CartPage} /> */}
					<CustomRoute path="/checkout" exact component={CheckOut} />
					<CustomRoute path="/showrooms" exact component={ShowRoomsPage} />
					<CustomRoute path="/cards" exact component={GiftsPage} />
					<CustomRoute path="/about" exact component={AboutPage} />

					{/* admin */}
					<NormalRoute path="/admin" component={AdminRoutes} />
					<CustomRoute path="/" exact component={HomePage} />

					{/* settings */}
					<NormalRoute path="/login" component={LoginPage} />
					<NormalRoute path="/change-password" component={ChangePassword} />
					<NormalRoute path="/forgot-password" component={ForgotPassword} />
					<NormalRoute path="/user-signup" component={SignUpPage} />

					{/* redirect to 404 page */}
					{/* <Route path="/not-found" component={NotFoundPage} /> */}
					{/* <Redirect from="*" to="/" /> */}
				</ShopContext>
			</CartContext>
		</Switch>
		// </div>
		// </div>
	);
};

export default ShopRoutes;
