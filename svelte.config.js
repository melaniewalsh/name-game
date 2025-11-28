import adapterStatic from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess,
	kit: {
		adapter: adapterStatic({ strict: false }),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/name-game' : ''
		},
		prerender: {
			handleMissingId: 'ignore',
			handleHttpError: ({ status, path }) => {
				if (status === 404 && (path === '/versus-multiplayer' || path === '/multiplayer')) {
					return;
				}
				throw new Error(`${status} ${path}`);
			}
		}
	}
};

export default config;
