import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//get form details
export const action = async ({ request }) => {
	const formData = await request.formData(); //provides the interface
	const data = Object.fromEntries(formData); //turns array into an object
	//since it's async
	try {
		await customFetch.post("/auth/register", data); //make a request
		toast.success("registration successful");
		return redirect("/login"); //if register successful, redirect to login page
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const Register = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<Wrapper>
			<Form method="post" className="form">
				{/* check if we are submitting form or pending */}
				<button
					type="submit"
					className="btn btn-block"
					disabled={isSubmitting}
				>
					{isSubmitting ? "submitting..." : "submit"}
				</button>

				<Logo />
				<h4>Register</h4>
				<FormRow
					type={"text"}
					name={"name"}
					labelText={"First Name"}
					defaultValue={"Joe"}
				/>
				<FormRow
					type={"text"}
					name={"lastName"}
					labelText={"Last Name"}
					defaultValue={"Cool"}
				/>
				<FormRow
					type={"text"}
					name={"location"}
					labelText={"Location"}
					defaultValue={""}
				/>
				<FormRow
					type={"text"}
					name={"email"}
					defaultValue={"snoopy@gmail.com"}
				/>
				<FormRow
					type={"password"}
					name={"password"}
					labelText={"Password"}
					defaultValue={"abc123456"}
				/>
				{/* only enables submit button when the request is complete, and shows 'submitting' while it's taking place */}
				<button
					type="submit"
					className="btn btn-block"
					disabled={isSubmitting}
				>
					{isSubmitting ? "submitting..." : "submit"}
				</button>
				<p>
					Already a member?
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Register;
