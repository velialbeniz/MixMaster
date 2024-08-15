import Wrapper from "../assets/wrappers/ErrorPage";
import { Link, useRouteError } from "react-router-dom";
import img from '../assets/not-found.svg'

const ErrorPage = () => {

    const error = useRouteError()
    console.log(error)
    if(error.status === 404) {
        return (
            <Wrapper>
                <div>
                    <img className="img" src={img} alt="not found"/>
                    <h3>Ohh!!</h3>
                    <p>{error.statusText || error.message}</p>
                    <Link to="/">Back Home</Link>
                </div>
            </Wrapper>
        )
    }
	return (
		<Wrapper>
			<h1>Page Not Found</h1>
		</Wrapper>
	);
};
export default ErrorPage;
