import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
	const { showSidebar } = useDashboardContext();
	//toggle to show / hide the side bar
	return (
		<Wrapper>
			<div
				className={
					showSidebar
						? "sidebar-container"
						: "sidebar-container show-sidebar"
				}
			>
				<div className="content">
					<header>
						<Logo />
					</header>
					{/* pass in a props so that the nav bar doesn't close everytime going to a new page (unlike small navbar) */}
					<NavLinks isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
};
export default BigSidebar;
