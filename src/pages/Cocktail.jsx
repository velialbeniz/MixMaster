import axios from "axios";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailQuery = (id) => {
	return {
        queryKey: ["cocktail", id],
		queryFn: async () => {
			const { data } = await axios.get(`${singleCocktailUrl}${id}`);
			return data;
		},
	};
};

// export const loader = async ({ params }) => {
// 	const { id } = params;
// 	const { data } = await axios.get(`${singleCocktailUrl}${id}`);
// 	return { id, data };
// };

export const loader =
	(queryClient) =>
	async ({ params }) => {
		const { id } = params;
		await queryClient.ensureQueryData(singleCocktailQuery(id));
		return { id };
	};

const Cocktail = () => {
	const { id } = useLoaderData();
	const { data } = useQuery(singleCocktailQuery(id));

	const singleCocktail = data.drinks[0];

	// if (!data) return <h2>Something went wrong...</h2>;
	if (!data) return <Navigate to="/" />;

	const { strDrink: name, strDrinkThumb: image, strAlcoholic: info, strGlass: glass, strInstructions: instructions, strCategory: category } = singleCocktail;
	// console.log(singleCocktail);

	const ingredients = [];
	for (let i = 1; i <= 15; i++) {
		const ingredient = singleCocktail[`strIngredient${i}`];
		const measure = singleCocktail[`strMeasure${i}`];
		if (ingredient) {
			if (measure) {
				ingredients.push(`${ingredient} - ${measure}`);
			} else {
				ingredients.push(ingredient);
			}
		} else {
			break;
		}
	}
	console.log("ingredients", ingredients);

	return (
		<Wrapper>
			<header>
				<Link
					to="/"
					className="btn">
					Back home
				</Link>
				<h3>{name}</h3>
			</header>
			<div className="drink">
				<img
					src={image}
					alt={name}
					className="img"
				/>
				<div className="drink-info">
					<p>
						<span className="drink-data">Name:</span>
						{name}
					</p>
					<p>
						<span className="drink-data">Category:</span>
						{category}
					</p>
					<p>
						<span className="drink-data">Info:</span>
						{info}
					</p>
					<p>
						<span className="drink-data">Glass:</span>
						{glass}
					</p>
					<p>
						<span className="drink-data">Ingredients:</span>
						{ingredients.join(", ")}
					</p>
					<p>
						<span className="drink-data">Instructions:</span>
						{instructions}
					</p>
				</div>
			</div>
		</Wrapper>
	);
};
export default Cocktail;
