import react from '@vitejs/plugin-react';
import { defineConfig, lazyPlugins } from 'vite-plus';

// https://vite.dev/config/
export default defineConfig({
	fmt: {
		useTabs: true,
		tabWidth: 4,
		printWidth: 120,
		semi: true,
		singleQuote: true,
		jsxSingleQuote: true,
		trailingComma: 'none',
		arrowParens: 'avoid',
		sortImports: true
	},
	lint: {
		plugins: ['react', 'oxc'],
		rules: {
			'react/rules-of-hooks': 'error',
			'react/only-export-components': [
				'warn',
				{
					allowConstantExport: true
				}
			]
		}
	},
	plugins: lazyPlugins(() => [react()])
});
