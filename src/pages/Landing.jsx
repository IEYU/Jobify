import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../components";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo></Logo>
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Codding Addict MERN 2024 Edition Course Project
						<br />
						Pellentesque eget vehicula lacus, eu porta eros.
						Suspendisse in elit interdum, pulvinar nisi a,
						ullamcorper eros. Phasellus condimentum semper dui, ut
						sollicitudin sem gravida iaculis. Cras id nisl non odio
						sollicitudin aliquet. Ut vestibulum diam sed dolor
						iaculis scelerisque. Nam laoreet nibh non accumsan
						placerat. Donec cursus orci est, at mattis ex mattis
						eget. Ut laoreet nisl ut augue facilisis, eu malesuada
						tortor lacinia. Duis eu felis eu libero accumsan
						hendrerit. Mauris mattis luctus pretium. Pellentesque
						habitant morbi tristique senectus et netus et malesuada
						fames ac turpis egestas. Nulla sodales magna nec ex
						scelerisque faucibus. Pellentesque elementum nunc vel
						pharetra interdum. Maecenas ante nibh, placerat sit amet
						sapien a, suscipit aliquet velit.
					</p>
					<Link to="/register" className="btn register-link">
						Register
					</Link>
					<Link to="/login" className="btn">
						Login / Demo User
					</Link>
				</div>
				<img src={main} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
