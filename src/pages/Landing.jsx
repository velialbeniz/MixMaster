import CocktailList from "../components/CocktailList";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailDB_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

//query functions
const searchCocktailsQuery = (searchTerm) => {
	return {
		queryKey: ["search", searchTerm || "all"],
		queryFn: async () => {
			const response = await axios.get(`${cocktailDB_URL}${searchTerm}`);
			return response.data.drinks;
		},
	};
};

// loader function
// Appjsx' de loader fn' yi invoke et queryClient i parametre vererek. daha sonra loader' a queryClient i parametre olarak vererek 
// ensureQueryData ile query'i cache kontrolü yapılabilir.

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    return { searchTerm };
  };

const Landing = () => {
	const { searchTerm } = useLoaderData();
	const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
	return (
		<>
			<SearchForm searchTerm={searchTerm} />
			<CocktailList drinks={drinks} />
		</>
	);
};
export default Landing;
