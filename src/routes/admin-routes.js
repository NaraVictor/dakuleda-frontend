import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

//pages
import {
	DashboardPage,
	OrdersPage,
	ProductsPage,
	SettingPages,
} from "../pages/admin/pages";

// components
import { AdminRoute } from "../helpers/route";
import { NotFoundPage } from "../pages";
import AdminTemplate from "../components/admin-template";
import {
	NewCategory,
	NewCoupon,
	NewManufacturer,
	NewProduct,
	NewSlider,
} from "../pages/admin/pages/components";

const AdminRoutes = (props) => {
	return (
		<AdminTemplate>
			<Switch>
				<AdminRoute path="/admin" exact component={DashboardPage} />
				<AdminRoute path="/admin/orders" exact component={OrdersPage} />
				<AdminRoute path="/admin/products" exact component={ProductsPage} />
				<AdminRoute path="/admin/settings" exact component={SettingPages} />

				{/* products */}
				<AdminRoute path="/admin/products/new" exact component={NewProduct} />
				{/* <AdminRoute path="/admin/products/new-tag" exact component={NewTag} /> */}
				<AdminRoute
					path="/admin/products/new-manufacturer"
					exact
					component={NewManufacturer}
				/>

				{/* settings */}
				<AdminRoute
					path="/admin/settings/new-coupon"
					exact
					component={NewCoupon}
				/>
				<AdminRoute
					path="/admin/settings/new-slider"
					exact
					component={NewSlider}
				/>
				<AdminRoute
					path="/admin/settings/new-category"
					exact
					component={NewCategory}
				/>

				{/* redirect to 404 page */}
				{/* <Route path="/not-found" component={NotFoundPage} /> */}
				{/* <Redirect to="/not-found" /> */}
			</Switch>
		</AdminTemplate>
	);
};

export default AdminRoutes;
