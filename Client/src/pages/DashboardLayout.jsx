import {
	Navigate,
	Outlet,
	redirect,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
	try {
		const { data } = await customFetch.get("/users/current-user");
		return data;
	} catch (error) {
		return redirect("/"); //if there's any issue with the JWT, user has to repeat login step
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData(); //get the user from database (returns an object and deconstruct to get the user property)
	const navigate = useNavigate(); //a react hook that returns a function for navigating to different routes

	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		//toggle b/t light and dark mode by toggling b/t two classes
		document.body.classList.toggle("dark-theme", newDarkTheme);
		localStorage.setItem("darkTheme", newDarkTheme); //store data across browser sessions
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate("/");
		await customFetch.get("/auth/logout");
		toast.success("Logging out...");
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar /> {/* use the dashboard context */}
					<BigSidebar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							{/* to render the child route elements */}
							<Outlet context={{ user }} />{" "}
							{/* context from the user object for all of the components inside those pages */}
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
