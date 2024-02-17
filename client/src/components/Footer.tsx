import { Footer } from "flowbite-react";
import {
	BsDribbble,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
} from "react-icons/bs";

const AppFooter = () => {
	return (
		<Footer container className="bg-gradient-to-r from-green-300 to-blue-200">
			<div className="w-full">
				<div className="w-full h-full hidden justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					<div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
						<div>
							<Footer.Title title="about" />
							<Footer.LinkGroup col>
								<Footer.Link href="#">Pipoca digital</Footer.Link>
								<Footer.Link href="#">Meet The Team</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Follow us" />
							<Footer.LinkGroup col>
								<Footer.Link href="#">Github</Footer.Link>
								<Footer.Link href="#">Discord</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Legal" />
							<Footer.LinkGroup col>
								<Footer.Link href="#">Privacy Policy</Footer.Link>
								<Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider className="sm:block hidden" />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<Footer.Copyright by="Lincoln Gibson™" year={2024} />
					<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
						<Footer.Icon href="#" icon={BsFacebook} />
						<Footer.Icon href="#" icon={BsInstagram} />
						<Footer.Icon href="#" icon={BsTwitter} />
						<Footer.Icon href="#" icon={BsGithub} />
						<Footer.Icon href="#" icon={BsDribbble} />
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default AppFooter;
