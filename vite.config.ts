import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "AWS-Quiz",
		short_name: "AWS-Quiz",
		description: "An app that can simulate AWS Certification.",
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/maskable_icon.png",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

import * as child from "child_process";
const commitHash = child.execSync("git rev-parse --short HEAD").toString()

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  
  const config = {
    plugins: [react(), VitePWA(manifestForPlugin)],
    base: '/',
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(commitHash)
	}
  }

  if (command !== 'serve') {
    config.base = '/aws-quiz/'
  }
  

  return config
})