import Wrapper from "../assets/wrappers/SearchForm";
import { Form, useNavigation } from "react-router-dom";

const SearchForm = ({searchTerm}) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";


	return (
		<Wrapper>
			<Form className="form">
				<div className="form-row">
					<label
						htmlFor="search"
						className="form-label"></label>
					<div style={{ display: "flex" }}>
						<input
							type="search"
							name="search"
							id="search"
							className="form-input"
                            defaultValue={searchTerm}
						/>
						<button
							type="submit"
							className="btn"
							disabled={isSubmitting}>
							{isSubmitting ? "Searching..." : "Search"}
						</button>
					</div>
				</div>
			</Form>
		</Wrapper>
	);
};
export default SearchForm;
