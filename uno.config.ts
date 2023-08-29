import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
	shortcuts: [{ logo: 'i-logos:svelte-icon w-7em h-7em transform transition-300' }],
	presets: [
		presetUno(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				provider: 'google',
				// these will extend the default theme
				sans: 'Open Sans',
				mono: ['Fira Code', 'Fira Mono:400,700']
			}
		})
	],
	safelist: ['bg-orange-300', 'prose', 'styled-input']
});
