import PageTitle from "../../../components/page-title";
import { useState } from "react";
import {
	AccountsComponent,
	CardsComponent,
	CategoriesComponent,
	CompanyComponent,
	ContactUsComponent,
	SlidersComponent,
} from "./components";
import { getRole } from "../../../helpers/auth";

const SettingPages = (props) => {
	const [page, setPage] = useState(2);
	return (
		<div className="page settings-page">
			<PageTitle title="Settings" />
			<h5>Settings</h5>
			<div className="sub-menu shadow-sm">
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
					Cards
				</a>
				<a
					className={`tab ${page === 3 && "active-tab"}`}
					href="#"
					onClick={() => setPage(3)}>
					Sliders
				</a>
				{getRole() === "admin" && (
					<a
						className={`tab ${page === 10 && "active-tab"}`}
						href="#"
						onClick={() => setPage(10)}>
						Accounts
					</a>
				)}
			</div>

			{page === 10 && <AccountsComponent />}
			{/* {page === 1 && <CompanyComponent />} */}
			{page === 2 && <CategoriesComponent />}
			{page === 3 && <SlidersComponent />}
			{page === 4 && <CardsComponent />}
			{/* {page === 5 && <ContactUsComponent />} */}
		</div>
	);
};

export { SettingPages };
