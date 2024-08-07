import Wrapper from "../assets/wrappers/JobInfo";
const JobInfo = ({ icon, text }) => {
	return (
		<Wrapper>
			<span className="job-icon">{icon}</span>
			<span className="job-tetx">{text}</span>
		</Wrapper>
	);
};
export default JobInfo;
