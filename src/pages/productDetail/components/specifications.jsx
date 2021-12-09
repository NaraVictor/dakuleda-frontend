import React from "react";

const Specifications = (props) => {
	const { features } = props;
	return (
		<section className="container py-5">
			<div className="row">
				<div className="col">
					<h4>Specifications</h4>
					{/* <hr /> */}
					{features.length === 0 ? (
						<h5 className="my-5 alert alert-danger">
							No Specifications for item
						</h5>
					) : (
						<table className="table my-3 table-hover">
							<tbody>
								{features.map((feat) => (
									<tr>
										<td>
											<strong>{feat.title}</strong>
										</td>
										<td>{feat.feature}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</section>
	);
};

export default Specifications;
