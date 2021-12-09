import React from "react";
import searchIcon from "../../static/svg/search.svg";

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: false,
		};
	}

	render() {
		return (
			<span id="search-container">
				{/* <ion-icon name="search" id="search-icon" size="small"></ion-icon> */}

				<img
					src={searchIcon}
					alt="search icon"
					// onClick={this.setState({ search: !this.state.search })}
					id="search-icon"
					height="30"
				/>
				<input
					type="search"
					name="q"
					id="search-box"
					className={this.state.search ? "visible-search" : ""}
					placeholder="search products, brands and categories"
				/>
			</span>
		);
	}
}

export default SearchBox;
