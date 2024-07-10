import { useDashboardContext } from "../pages/DashboardLayout";
import Links from "../utils/Links";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
	//need dashboardContext for togglesidebar, and user role for later implementation of extra links
	const { toggleSidebar, user } = useDashboardContext();
	return (
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
	);
};
export default NavLinks;
