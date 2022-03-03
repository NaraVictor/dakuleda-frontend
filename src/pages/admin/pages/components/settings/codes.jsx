import { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../../../../helpers/utilities";
import { useForm } from "react-hook-form";
import { postData } from "../../../../../helpers/utilities";
import { getRole } from "../../../../../helpers/auth";

const CardCodes = ({ cardId, codeObj }) => {
	const [codes, setCodes] = useState([]);
	const [counter, setCounter] = useState(1);
	const { handleSubmit, reset, register } = useForm();

	const fetchCodes = () => {
		fetchData(`cards/${cardId}/codes`).then((r) => {
			setCodes(r.data?.data);
		});
	};

	const deleteCode = async (codeId) => {
		deleteData(`cards/${cardId}/codes/${codeId}`);
		await fetchCodes();
	};

	const submitCode = (data) => {
		postData(`cards/${cardId}/codes`, data)
			.then((r) => {
				if (r.status === 200) {
					// fetchCodes();
					reset();
					setCounter(counter + 1);
					alert("code successfully added!");
					return;
				}
				throw new Error(r);
			})
			.catch((ex) => {
				if (ex.toString().includes("409")) {
					alert("the code is already taken");
					return;
				}
				alert("something went wrong");
			});
	};

	useEffect(() => {
		!codeObj ? fetchCodes() : setCodes([...codeObj]);
	}, [counter]);

	return (
		<div className="row mt-0">
			<div className="col-7 mt-0">
				<small>
					<strong>{codes.length}</strong> codes
				</small>
				<small className="mx-3">
					|{" "}
					<strong className="ml-3">
						{codes.filter((c) => c.isUsed === true).length}
					</strong>{" "}
					used
				</small>
				<small>
					-
					<strong className="ml-3">
						{codes.filter((c) => c.isUsed === false).length}
					</strong>{" "}
					available
				</small>

				<table className="table table-hover">
					<thead>
						<tr>
							<th>Code</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{codes.length > 0 ? (
							codes.map((s) => (
								<tr key={s.id}>
									<td>{s.code}</td>
									<td>
										{s.isUsed ? (
											<strong className="text-danger">Used</strong>
										) : (
											<strong className="text-success">Available</strong>
										)}
									</td>
									{getRole() === "admin" && !s.isUsed && (
										<td>
											<a
												href="#"
												onClick={() => {
													if (window.confirm("proceeding deleting code?")) {
														deleteCode(s.id).then((r) =>
															setCounter(counter + 1)
														);
													}
												}}>
												delete
											</a>
										</td>
									)}
								</tr>
							))
						) : (
							<p>No codes found. Consider adding some</p>
						)}
					</tbody>
				</table>
			</div>
			<div className="col-5">
				<h5>Add Code</h5>
				<hr />
				<form onSubmit={handleSubmit(submitCode)}>
					<label htmlFor="card" className="d-form-label">
						Code (card number and serial) *
					</label>
					<div className="row">
						<input
							type="text"
							id="card"
							maxLength="3"
							required
							placeholder="XXX"
							className="d-form-control col-3 shadow mr-2"
							{...register("card", { required: true })}
						/>
						<input
							type="text"
							id="serial"
							maxLength="5"
							placeholder="XXXXX"
							required
							className="d-form-control col-6 shadow"
							{...register("serial", { required: true })}
						/>

						<button className="btn-dc-white mt-3" type="submit">
							<i className="bi bi-plus"></i>
							add code
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export { CardCodes };
