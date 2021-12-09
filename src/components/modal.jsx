import { useEffect, useState } from "react";

const AppModal = ({
	open = false,
	title,
	className,
	content,
	size = "md-modal",
	containerClass,
}) => {
	const [modal, setModal] = useState({
		open,
		content: "",
		title: "",
		size,
	});

	const handleClose = () => {
		setModal({
			open: false,
		});
		// toggleModal();
	};

	// useEffect(() => {
	// 	// handleOpen
	// 	// toggleModal(openModal, content, title, size);
	// 	// setModal({
	// 	// 	open: true,
	// 	// });
	// 	return () => {
	// 		handleClose();
	// 	};
	// }, []);

	// title, open, onClose, content, size, modal;

	return (
		<div
			id="open-modal"
			className={`modal-window ${modal.open && "show-modal"} ${className} ${
				modal.size
			}`}>
			<div className={`modal-container ${containerClass}`}>
				<div className="d-flex">
					<h3 className="d-inline header">{title}</h3>
					<a href="#" className="modal-close" onClick={() => handleClose()}>
						<span className="material-icons">close</span>
						{/* <span className="d-none d-md-inline">Close</span>{" "} */}
					</a>
				</div>
				{content}
			</div>
		</div>
	);
};

export default AppModal;
