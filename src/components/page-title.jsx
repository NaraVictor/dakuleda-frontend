import { Helmet } from "react-helmet";
import { constants } from "../helpers/config";

const PageTitle = ({ title, children }) => {
	return (
		<Helmet>
			<title>
				{title} - {constants.siteTitle}
			</title>
			{children}
		</Helmet>
	);
};

export default PageTitle;
