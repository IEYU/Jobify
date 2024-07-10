import { Outlet } from "react-router-dom";

// layout here will be shared across all the child pages
// need to set up the index page for the parent
const HomeLayout = () => {
  return (
    <div>
      <nav>nav bar for demonstration</nav>

      {/* content in the child pages will be displayed in this outlet component */}
      <Outlet />
    </div>
  );
};
export default HomeLayout;
