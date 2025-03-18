import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

export default defineConfig({
	preset: {
		...minimal2023Preset,
		transparent: {
			sizes: [64, 192, 512],
			favicons: [[48, "favicon.ico"]],
			padding: 0,
		},
		maskable: {
			sizes: [512],
			padding: 0.2,
			resizeOptions: { background: "black" },
		},
		apple: {
			sizes: [180],
			padding: 0,
		},
	},
	images: ["public/icon.svg"],
});
