import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	server: {
		proxy: {
			"/api": "http://localhost:5000",
		},
	},
	plugins: [
		tailwindcss(),
		svgr(),
		react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "VDB",
				short_name: "VDB",
				description: "Card search and deck building app for Vampire the Eternal Struggle (VTES).",
				lang: "en-US",
				start_url: "/decks",
				display: "standalone",
				background_color: "#000000",
				theme_color: "#303040",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
	resolve: {
		alias: [
			{ find: "@", replacement: resolve(__dirname, "src") },
			{ find: "@icons", replacement: resolve(__dirname, "node_modules/bootstrap-icons/icons") },
		],
	},
});
