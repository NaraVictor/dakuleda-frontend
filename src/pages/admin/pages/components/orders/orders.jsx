const OrdersComponent = ({ state }) => {
	return (
		<div className="components">
			<div className="row">
				<div className="col-5">
					table listing all contact us information here
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						select an order to view details
						{state && (
							<h6>
								State is: <strong>{state}</strong>
							</h6>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { OrdersComponent };
