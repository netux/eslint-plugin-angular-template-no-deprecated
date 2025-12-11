import fs from 'node:fs';
import path from 'node:path';

export function findComponentTsFileFromTemplateFile(
	templateFilePath: string
): string | undefined {
	if (path.extname(templateFilePath) === '.ts') {
		// You are already there!
		return templateFilePath;
	}

	// TODO(netux): don't assume the file is on the same folder
	// TODO(netux): handle templateFilePath being a .ts file with an inline template
	const tsFilePath = templateFilePath.replace(/\.html$/, '.ts');
	try {
		fs.statSync(tsFilePath);
	} catch (error) {
		if (
			error &&
			typeof error === 'object' &&
			'code' in error &&
			['ENOENT', 'ENOTDIR'].includes(error.code as string)
		) {
			return;
		}

		throw error;
	}

	return tsFilePath;
}

export function findTsConfig(filePath: string) {
	let rootPath = fs.statSync(filePath).isDirectory()
		? filePath
		: path.dirname(filePath);
	do {
		for (const filePath of fs.readdirSync(rootPath)) {
			if (filePath === 'tsconfig.json') {
				return path.resolve(rootPath, filePath);
			}
		}

		rootPath = path.dirname(rootPath);
	} while (path.dirname(rootPath) !== rootPath);
}
