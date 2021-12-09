import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authenticate, setRole } from "../../../helpers/auth";
import logo from "../../../static/img/logo/logo.png";
import PageTitle from "./../../../components/page-title";
import { postData } from "./../../../helpers/utilities";

const LoginPage = (props) => {
	const { register, handleSubmit } = useForm();
	const [loginError, setError] = useState(false);
	const [busy, setBusy] = useState(false);
	const [errMsg, setErrMsg] = useState("Login error");
	const [btnLabel, setLabel] = useState("Login");
	const route = { ...props.location?.state };
	const history = useHistory();
	const onSubmit = (data) => {
		setLabel(() => {
			return "Please wait...";
		});
		setBusy(true);

		postData("accounts/login", data)
			.then((res) => {
				if (res.status === 200) {
					setError(false);
					authenticate(res.data.token, res.data.data);
					setRole(res.data.data.role);
					return history.replace(route?.from?.pathname || "/admin");
				}
			})
			.catch((err) => {
				setError(true);
				setLabel(() => {
					return "Login";
				});

				//messages
				if (err.response?.status === 403)
					return setErrMsg("Access denied. You are not authorized");

				if (err.response?.status === 500) return setErrMsg("Server error");

				setErrMsg("Invalid username or password");
			})
			.finally(() => setBusy(false));
	};

	return (
		<div className="auth w-25 mx-auto mt-5">
			<PageTitle title="Login" />
			<div className="bg-white rounded shadow p-4">
				<div className="inner admin-login">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="text-center">
							<img
								src={logo}
								height="80"
								alt="dakuleda company logo"
								className="my-4"
							/>
							<h6 className="mt-3">
								<strong>Login</strong>
							</h6>
						</div>
						{loginError && (
							<div className="bg-danger p-1 mb-3 text-center text-light rounded">
								<small>{errMsg}</small>
							</div>
						)}
						<div className="row">
							<div className="col-12 mb-3">
								<input
									autoFocus
									type="email"
									label="Email"
									placeholder="email address"
									required
									className="w-100 form-control"
									{...register("email", { required: true })}
								/>
							</div>
							<div className="col-12">
								<input
									required
									type="password"
									label="Password"
									placeholder="password"
									className="w-100 form-control"
									{...register("password", { required: true })}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={busy}
							className="btn btn-primary w-100 my-4">
							{btnLabel}
						</button>

						<div className="d-flex justify-content-between">
							<small className="forgot-password">
								Forgot <Link to="/forgot-password">password?</Link>
							</small>
							<small className="forgot-password">
								<Link to="/change-password">Change password</Link>
							</small>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export { LoginPage };
