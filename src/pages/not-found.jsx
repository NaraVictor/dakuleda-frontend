import PageTitle from "../components/page-title";

const NotFoundPage = (props) => {
	return (
		<div className="text-center mt-5">
			<PageTitle title="404 Resource not found" />
			<h1>Oops!</h1>
			<h4>Resource not found</h4>
			<a href="#" onClick={() => props.history.go(-1)}>
				Go back
			</a>
		</div>
	);
};

export { NotFoundPage };
