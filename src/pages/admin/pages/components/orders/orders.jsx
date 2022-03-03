import { useState, useEffect } from "react";
import { Spinner2 } from "../../../../../components/spinner";
import { fetchData } from "../../../../../helpers/utilities";
import { OrderDetail } from "./order-detail";
import { format } from "date-fns";
import { cedisLocale } from "./../../../../../helpers/utilities";
import { Modal, Table, Space } from "antd";
import {
	AlertFilled,
	DeleteOutlined,
	EditOutlined,
	FolderOpenTwoTone,
	PlusOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
const OrdersComponent = ({ state }) => {
	const [orders, setOrders] = useState([]);
	const [selected, setSelected] = useState({});
	const [timeOut, setTimeOut] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const [modal, setModal] = useState({
		isVisible: false,
		content: "",
		title: "",
		width: "",
	});

	const showModal = (title, content, width) => {
		setModal({
			content,
			title,
			isVisible: true,
			width,
		});
	};

	const handleCancel = () => {
		setModal({
			...modal,
			isVisible: false,
		});
	};

	const [mode, setMode] = useState({
		edit: false,
		data: {},
	});

	const handleEdit = (data, editMode) => {
		setMode({
			edit: editMode,
			data,
		});
	};

	const selectItem = (item) => {
		setSelected(item);
		setMode({
			...mode,
			edit: false,
		});
	};

	const fetchOrders = (status) => {
		fetchData(`orders?status=${status}`).then((res) => {
			setOrders(res.data?.data);
			setFilteredData(res.data?.data);
		});
	};

	useEffect(() => {
		fetchOrders(state);
	}, [state]);

	const tableCols = [
		{
			title: "Customer",
			dataIndex: "customerName",
			sorter: (a, b) => a.customerName.length - b.customerName.length,
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Mode",
			width: "100px",
			dataIndex: "paymentMode",
			sorter: (a, b) => a.paymentMode - b.paymentMode,
			sortDirections: ["descend", "ascend"],
			// render: (t, r, i) => cedisLocale.format(r.paymentMode),
		},
		{
			title: "Order Total",
			width: "100px",

			sorter: (a, b) => a.orderTotal - b.orderTotal,
			sortDirections: ["descend", "ascend"],
			render: (t, r, i) => cedisLocale.format(r.orderTotal),
		},

		// {
		// 	title: "Action",
		// 	render: (text, record, index) => (
		// 		<ButtonGroup>
		// 			<Button
		// 				title="view record details"
		// 				className="d-flex align-items-center"
		// 				onClick={() =>
		// 					showModal(record.productName, <ProductDetail prod={record} />)
		// 				}>
		// 				<FolderOpenTwoTone />
		// 			</Button>
		// 			{getRole() === ("admin" || "manager") && (
		// 				<>
		// 					<Button
		// 						title="edit record"
		// 						className="d-flex align-items-center"
		// 						onClick={() =>
		// 							showModal(
		// 								`Editing: ${record.productName}`,
		// 								<ProductEdit prod={record} onReload={fetchProducts} />
		// 							)
		// 						}>
		// 						<EditOutlined />
		// 						{/* Edit */}
		// 					</Button>
		// 					<Button
		// 						title="delete record"
		// 						onClick={() => deleteProduct(record.id)}>
		// 						<DeleteOutlined className="text-danger" />
		// 					</Button>
		// 				</>
		// 			)}
		// 		</ButtonGroup>
		// 	),
		// },
	];

	return (
		<div className="components">
			<Modal
				title={modal.title}
				visible={modal.isVisible}
				footer={null}
				onCancel={handleCancel}
				width={modal.width && modal.width}>
				{modal.content}
			</Modal>
			<div className="row">
				<div className="col-md-5">
					<Table
						loading={filteredData.length === 0 ? "false" : "true"}
						rowKey={(record) => record.id}
						bordered
						sticky
						pagination={{ defaultPageSize: 10 }}
						footer={(data) => (
							<Space>
								<strong>{data.length}</strong> records
							</Space>
						)}
						columns={tableCols}
						dataSource={filteredData}
					/>

					{orders.length === 0 ? (
						<>
							{timeOut === false ? (
								<>
									<Spinner2 />
									{setTimeout(() => {
										setTimeOut(true);
									}, 1000)}
								</>
							) : (
								<p>No records found..</p>
							)}
						</>
					) : (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Customer</th>
									<th>Mode</th>
									<th>Order Total</th>
									{/* <th>Status</th> */}
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order.id}
										onClick={() => selectItem(order)}
										className={`${order.id === selected.id && "bg-info"}`}>
										<td>{order.customerName}</td>
										<td>{order.paymentMode}</td>
										<td>{cedisLocale.format(order.orderTotal)}</td>
										{/* <td>{order.status}</td> */}
										<td>{format(new Date(order.orderDate), "EEE, MMM d")}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<div className="col-7">
					<div className="shadow detail-view">
						<OrderDetail
							order={selected}
							onEdit={handleEdit}
							onReload={() => {
								fetchOrders(state);
								setSelected({});
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { OrdersComponent };
