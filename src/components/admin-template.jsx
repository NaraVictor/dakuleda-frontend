import AdminTemplateNav from "./template-nav";
// import userIcon from "../static/img/boy.png";
import { getUser, logOut } from "../helpers/auth";
import logo from "../static/img/logo/logo-new.png";

const AdminTemplate = (props) => {
	return (
		<div className="admin-template">
			<div className="nav upper-nav py-3">
				{/* <h2 className="title mb-0">Dakuleda</h2> */}
				<a href="/">
					<img src={logo} alt="company logo" height="50" />
				</a>
				<div>
					<span className="d-block">
						Hi, <strong>{getUser()?.fullName}</strong>
					</span>
					<a href="#" onClick={() => logOut()}>
						Log out
					</a>
				</div>
			</div>
			<AdminTemplateNav />
			<div className="content">
				{/* <div className="status-bar bg-success p-2">status bar</div> */}
				<div className="p-md-4 p-2 container">{props.children}</div>
			</div>
		</div>
	);
};

export default AdminTemplate;
