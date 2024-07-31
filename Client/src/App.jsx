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
	EditJob,
} from "./pages";
import { element } from "three/examples/jsm/nodes/Nodes.js";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";

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
				action: loginAction,
			},
			{
				path: "dashboard",
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					//pages to render in the dashboard apge
					{
						index: true,
						element: <AddJob />, //add job is set to be the index page of dashboard
						action: addJobAction,
					},
					{
						path: "stats",
						element: <Stats />,
					},
					{
						path: "all-jobs",
						element: <AllJobs />,
						loader: allJobsLoader,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "admin",
						element: <Admin />,
					},
					{
						path: "edit-job/:id", //route to that specific job
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction,
					},
					{ path: "delete-job/:id", action: deleteJobAction },
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
