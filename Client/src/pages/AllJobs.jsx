import {
	Form,
	redirect,
	useLoaderData,
	useNavigation,
	useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
	FormRow,
	FormRowSelect,
	JobsContainer,
	SearchContainer,
} from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { createContext, useContext } from "react";

export const loader = async () => {
	try {
		const { data } = await customFetch.get("/jobs");
		return { data };
	} catch (error) {
		toast.error(error?.resposne?.data?.msg);
		return error;
	}
};

const AllJobsContext = createContext();
const AllJobs = () => {
	const { data } = useLoaderData();
	return (
		<AllJobsContext.Provider value={{ data }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

//setup the hook
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
