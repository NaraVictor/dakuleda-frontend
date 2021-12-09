import { useState } from "react";
import { useForm } from "react-hook-form";
import { postData } from "./../../../../../helpers/utilities";
const NewSlider = (props) => {
	const [hasButton, setHasButton] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [busy, setBusy] = useState(false);

	const submitData = (data) => {
		setBusy(true);
		postData("sliders", { ...data })
			.then((res) => {
				if (res.status === 200) {
					reset();
					alert("slider created successfully");
				}
			})
			.catch((ex) => alert("an error occurred"))
			.finally(() => setBusy(false));
	};
	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h5>New Slider</h5>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<div className="row">
				<div className="col-10">
					<button
						className={`${
							busy ? "btn-dc-white" : "btn-primary-filled"
						} px-4 py-2`}
						disabled={busy}
						onClick={() => document.getElementById("submitter").click()}>
						<i className="bi bi-check-all"></i>
						{busy ? "processing..." : "Submit"}
					</button>
				</div>
				<div className="col-2">
					<button
						className="btn-dc-white"
						onClick={() => document.getElementById("sliderImage").click()}>
						<i className="bi bi-image mr-1"></i>
						upload image
					</button>
				</div>
			</div>
			<hr />

			<form onSubmit={handleSubmit(submitData)}>
				<div className="row">
					<div className="col-12">
						<div className="col-9">
							<label htmlFor="title" className="d-form-label">
								Title *
							</label>
							<input
								type="text"
								id="title"
								placeholder="slider title"
								{...register("title", { required: true })}
								className="d-form-control w-100 shadow"
							/>
						</div>
						<div className="col-9 my-3">
							<label htmlFor="url" className="d-form-label">
								Url
							</label>
							<input
								type="text"
								id="url"
								placeholder="link that slider will send user to when clicked"
								className="d-form-control w-100 shadow"
								{...register("url")}
							/>
						</div>
						<div className="col-9 my-3">
							<label htmlFor="descripton" className="d-form-label">
								Description
							</label>
							<input
								type="text"
								placeholder="text will be displayed in slider"
								id="descripton"
								className="d-form-control w-100 shadow"
								{...register("description")}
							/>
						</div>
						<div className="col-9 mt-5">
							<input
								type="checkbox"
								id="hasButton"
								{...register("hasButton")}
								onClick={() => setHasButton(!hasButton)}
							/>
							<label htmlFor="hasButton" className="ml-3">
								Add Button
							</label>
						</div>
						{hasButton && (
							<div className="col-9">
								<label htmlFor="buttonText" className="d-form-label">
									Button Label
								</label>
								<input
									type="text"
									id="buttonText"
									{...register("buttonText")}
									placeholder="a label for the button"
									className="d-form-control w-100 shadow"
								/>
							</div>
						)}
					</div>
				</div>
				<input
					type="file"
					name="sliderImage"
					id="sliderImage"
					hidden
					accept=".jpg, .png, .gif, .jpeg"
				/>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewSlider };
