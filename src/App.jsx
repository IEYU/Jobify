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
