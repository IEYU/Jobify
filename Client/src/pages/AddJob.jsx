import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

const AddJob = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">add job</h4>
				<div className="form-center">
					<FormRow type={"text"} name={"position"} />
					<FormRow type={"text"} name={"company"} />
					<FormRow
						type={"text"}
						labelText={"job location"}
						name={"jobLocation"}
						// defaultValue={user.location}
					/>
					{/* job status */}
					<FormRowSelect
						labelText={"job status"}
						name={"jobStatus"}
						defaultValue={JOB_STATUS.PENDING}
						list={Object.values(JOB_STATUS)}
					/>
					{/* job type */}
					<FormRowSelect
						labelText={"job type"}
						name={"jobType"}
						defaultValue={JOB_TYPE.INTERNSHIP}
						list={Object.values(JOB_TYPE)}
					/>
					<button
						type="submit"
						className="btn btn-block form-btn"
						disabled={isSubmitting}
					>
						{isSubmitting ? "submitting" : "submit"}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
};
export default AddJob;
