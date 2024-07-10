import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext();

	return (
		<Wrapper>
			{/* the css properties to controls the look of the side bar when the screen is big or small */}
			{/* get the state value from dashboard context to show/hide the side bar */}
			<div
				className={
					showSidebar
						? "sidebar-container show-sidebar"
						: "sidebar-container"
				}
			>
				<div className="content">
					{/* add toggle button to reset the state of showSidebar */}
					<button
						type="button"
						className="close-btn"
						onClick={toggleSidebar}
					>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
