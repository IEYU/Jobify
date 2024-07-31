import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const LogoutContainer = () => {
	const [showLogout, setShowLogout] = useState(false); //useState hook returns a pair: the current state value and an update function
	const { user, logoutUser } = useDashboardContext(); //useContext hook is used to access the context value, which can be any value passed to the context provider

	return (
		<Wrapper>
			<button
				type="button"
				className="btn logout-btn"
				onClick={() => setShowLogout(!showLogout)}
			>
				{user.avatar ? (
					<img src={user.avatar} alt="avatar" className="img" />
				) : (
					<FaUserCircle />
				)}
				{user?.name}
				<FaCaretDown />
			</button>

			<div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
				<button
					type="button"
					className="dropdown-btn"
					onClick={logoutUser}
				>
					logout
				</button>
			</div>
		</Wrapper>
	);
};
export default LogoutContainer;
