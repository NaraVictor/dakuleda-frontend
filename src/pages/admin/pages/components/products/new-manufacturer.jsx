import { useForm } from "react-hook-form";
import { useState } from "react";
import { postData } from "./../../../../../helpers/utilities";
const NewManufacturer = (props) => {
	const { handleSubmit, reset, register } = useForm();
	const [busy, setBusy] = useState(false);

	const submitData = (data) => {
		setBusy(true);
		postData("manufacturers", { ...data })
			.then((res) => {
				if (res.status === 200) {
					reset();
					alert("manufacturer created successfully");
				}
			})
			.catch((ex) => alert("an error occurred"))
			.finally(() => setBusy(false));
	};
	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h5>New Manufacturer</h5>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<button
				className={`${busy ? "btn-dc-white" : "btn-primary-filled"} px-4 py-2`}
				disabled={busy}
				onClick={() => document.getElementById("submitter").click()}>
				<i className="bi bi-check-all"></i>
				{busy ? "processing..." : "Submit"}
			</button>
			<hr />

			<form onSubmit={handleSubmit(submitData)}>
				<div className="row">
					<div className="col-12">
						<div className="col-9">
							<label htmlFor="name" className="d-form-label">
								Manufacturer Name *
							</label>
							<input
								type="text"
								id="name"
								className="d-form-control w-100 shadow"
								{...register("name", { required: true })}
							/>
						</div>
						<div className="col-9 my-3">
							<label htmlFor="email" className="d-form-label">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="d-form-control w-100 shadow"
								{...register("email")}
							/>
						</div>
						<div className="col-9">
							<label htmlFor="website" className="d-form-label">
								Website
							</label>
							<input
								type="text"
								id="website"
								className="d-form-control w-100 shadow"
								{...register("website")}
							/>
						</div>
					</div>
				</div>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewManufacturer };
