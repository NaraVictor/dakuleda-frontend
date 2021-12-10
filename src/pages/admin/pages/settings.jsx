import PageTitle from "../../../components/page-title";
import { useState } from "react";
import {
	AccountsComponent,
	CategoriesComponent,
	CompanyComponent,
	ContactUsComponent,
	CouponsComponent,
	SlidersComponent,
} from "./components";

const SettingPages = (props) => {
	const [page, setPage] = useState(0);
	return (
		<div className="page settings-page">
			<PageTitle title="Settings" />
			<h5>Settings</h5>
			<div className="sub-menu shadow-sm">
				<a
					className={`tab ${page === 0 && "active-tab"}`}
					href="#"
					onClick={() => setPage(0)}>
					Accounts
				</a>
				<a
					className={`tab ${page === 2 && "active-tab"}`}
					href="#"
					onClick={() => setPage(2)}>
					Categories
				</a>
				{/* <a
					className={`tab ${page === 5 && "active-tab"}`}
					href="#"
					onClick={() => setPage(5)}>
					Contact Us
				</a>
				<a
					className={`tab ${page === 1 && "active-tab"}`}
					href="#"
					onClick={() => setPage(1)}>
					Company
				</a> */}

				<a
					className={`tab ${page === 4 && "active-tab"}`}
					href="#"
					onClick={() => setPage(4)}>
					Coupons
				</a>
				{/* <a
					className={`tab ${page === 3 && "active-tab"}`}
					href="#"
					onClick={() => setPage(3)}>
					Sliders
				</a> */}
			</div>

			{page === 0 && <AccountsComponent />}
			{/* {page === 1 && <CompanyComponent />} */}
			{page === 2 && <CategoriesComponent />}
			{/* {page === 3 && <SlidersComponent />} */}
			{page === 4 && <CouponsComponent />}
			{/* {page === 5 && <ContactUsComponent />} */}
		</div>
	);
};

export { SettingPages };
