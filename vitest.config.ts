import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dir: './tests',
		exclude: ['**/node_modules/**', '**/.git/**', 'project/**/*'],
		setupFiles: ['./tests/setup.ts']
	}
});
