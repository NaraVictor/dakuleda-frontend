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
	NewCard,
	NewManufacturer,
	NewProduct,
	NewSlider,
} from "../pages/admin/pages/components";
import NewProductContext from "../context/newProductContext";

const AdminRoutes = (props) => {
	return (
		<AdminTemplate>
			<Switch>
				<NewProductContext>
					<AdminRoute path="/admin" exact component={DashboardPage} />
					<AdminRoute path="/admin/orders" exact component={OrdersPage} />

					<AdminRoute path="/admin/products" exact component={ProductsPage} />
					<AdminRoute
						path="/admin/settings"
						role="manager"
						exact
						component={SettingPages}
					/>

					{/* products */}
					<AdminRoute
						path="/admin/products/new"
						role="manager"
						exact
						component={NewProduct}
					/>
					{/* <AdminRoute path="/admin/products/new-tag" exact component={NewTag} /> */}
					<AdminRoute
						path="/admin/products/new-manufacturer"
						role="manager"
						exact
						component={NewManufacturer}
					/>

					{/* settings */}
					<AdminRoute
						path="/admin/settings/new-card"
						role="manager"
						exact
						component={NewCard}
					/>
					<AdminRoute
						path="/admin/settings/new-slider"
						role="manager"
						exact
						component={NewSlider}
					/>
					<AdminRoute
						path="/admin/settings/new-category"
						role="admin"
						exact
						component={NewCategory}
					/>

					{/* redirect to 404 page */}
					{/* <Route path="/not-found" component={NotFoundPage} /> */}
					{/* <Redirect to="/not-found" /> */}
				</NewProductContext>
			</Switch>
		</AdminTemplate>
	);
};

export default AdminRoutes;
