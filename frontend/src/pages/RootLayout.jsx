import { Outlet } from "react-router";
import { OfflineNotification, UpdateNotification } from "@/components";
import { AppProvider, ThemeProvider } from "@/context";
import Navigation from "@/pages/Navigation.jsx";

const RootLayout = () => {
	return (
		<AppProvider>
			<ThemeProvider>
				<Navigation />
				<OfflineNotification />
			</ThemeProvider>
			<main>
				<Outlet />
			</main>
			<UpdateNotification />
		</AppProvider>
	);
};

export default RootLayout;
