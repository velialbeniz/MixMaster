import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigation } from "react-router-dom";

const HomeLayout = () => {
	const navigation = useNavigation();
	const isPageLoading = navigation.state === "loading";

	return (
		<>
			<Navbar />
			<section className="page">
                {isPageLoading ? <div className="loading" /> : <Outlet />}
            </section>
		</>
	);
};
export default HomeLayout;
