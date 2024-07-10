import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import Links from "../utils/Links";
import { NavLink } from "react-router-dom";

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
					<div className="nav-links">
						{Links.map((link) => {
							const { text, path, icon } = link;
							return (
								<NavLink //also add toggle button to reset the state of showSidebar
									to={path}
									key={text}
									className={"nav-link"}
									onClick={toggleSidebar}
									end //changes navlink matching logic to match the end of url/(path)
								>
									<span className="icon">{icon}</span>
									{text}
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
