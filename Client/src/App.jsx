import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	HomeLayout,
	Landing,
	Register,
	Login,
	DashboardLayout,
	Error,
	AddJob,
	Stats,
	AllJobs,
	Profile,
	Admin,
} from "./pages";
import { element } from "three/examples/jsm/nodes/Nodes.js";
import { action as registerAction } from "./pages/Register";

//add the checking in App.js instead of dashboard so that the setting can be applied to all the child pages
export const checkDefaultTheme = () => {
	const isDarkTheme = localStorage.getItem("darkTheme") === "true";
	document.body.classList.toggle("dark-theme", isDarkTheme);
	return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
	{
		//parent route
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true, // set as teh index page for the parent
				element: <Landing />,
			},
			{
				path: "register",
				element: <Register />,
				action: registerAction,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "dashboard",
				element: <DashboardLayout />,
				children: [
					//pages to render in the dashboard apge
					{
						index: true,
						element: <AddJob />, //add job is set to be the index page of dashboard
					},
					{
						path: "stats",
						element: <Stats />,
					},
					{
						path: "all-jobs",
						element: <AllJobs />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "admin",
						element: <Admin />,
					},
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
