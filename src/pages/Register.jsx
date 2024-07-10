import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";

const Register = () => {
	return (
		<Wrapper>
			<form className="form">
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
				<button type="submit" className="btn btn-block">
					submit
				</button>
				<p>
					Already a member?
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
