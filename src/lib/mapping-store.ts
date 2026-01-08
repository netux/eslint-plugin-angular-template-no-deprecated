import path from 'node:path';
import { createProjectService } from '@typescript-eslint/project-service';
import { SyntaxKind, ClassDeclaration } from 'typescript';
import {
	AngularEntityType,
	getAngularEntity,
	hasDeprecatedAnnotation
} from '../util/typescript-angular-ast';
import { findTsConfig } from './find-files';

interface Mapping {
	tsConfigFilePath: string;
	sourceFilePaths: string[];
	components: Map<string, AngularElementMapping>;
	directives: Map<string, AngularElementMapping>;
}

interface AngularElementMapping {
	filePath: string;
	className: string;
	isDeprecated: boolean;
	properties: Record<
		string,
		{
			isDeprecated: boolean;
		}
	>;
}

const mappings: Mapping[] = [];

function getOrLoadMappings(
	initiatorTsFileAbsolutePath: string
): Mapping | null {
	let mapping = mappings.find(({ sourceFilePaths }) =>
		sourceFilePaths.some(
			(otherFilePath) => otherFilePath === initiatorTsFileAbsolutePath
		)
	);
	if (mapping) {
		return mapping;
	}

	const tsConfigFilePath = findTsConfig(initiatorTsFileAbsolutePath);
	if (tsConfigFilePath == null) {
		return null;
	}

	const tsConfigRootDirectoryPath = path.dirname(tsConfigFilePath);

	const { service: tsProjectService } = createProjectService({
		tsconfigRootDir: tsConfigRootDirectoryPath
	});
	tsProjectService.openClientFile(initiatorTsFileAbsolutePath);

	const scriptInfo = tsProjectService.getScriptInfo(
		initiatorTsFileAbsolutePath
	)!;

	const program = tsProjectService
		.getDefaultProjectForFile(scriptInfo.fileName, /* ensureProject: */ true)!
		.getLanguageService(/* ensureSynchronized: */ true)
		.getProgram()!;

	tsProjectService.closeClientFile(initiatorTsFileAbsolutePath);

	const componentsMap: Mapping['components'] = new Map();
	const directivesMap: Mapping['directives'] = new Map();

	for (const sourceFile of program.getSourceFiles()) {
		for (const statement of sourceFile.statements) {
			if (statement.kind !== SyntaxKind.ClassDeclaration) {
				continue;
			}

			const statementClass = statement as ClassDeclaration;
			if (!statementClass.name) {
				// TODO(netux): here we heavily rely on the component class being exported and imported with the same name
				// It could be i.e., (although not common) that the class is nameless and is default exported.
				continue;
			}

			const angularEntity = getAngularEntity(statementClass);
			if (angularEntity == null) {
				continue;
			}

			switch (angularEntity.type) {
				case AngularEntityType.Component: {
					const component = {
						filePath: sourceFile.fileName,
						className: statementClass.name.getText(),
						isDeprecated: hasDeprecatedAnnotation(statementClass),
						properties: Object.fromEntries(
							angularEntity.exposedProperties.map((property) => [
								property.name,
								{ isDeprecated: hasDeprecatedAnnotation(property.propertyAst) }
							])
						)
					};

					for (const selector of angularEntity.selectors) {
						componentsMap.set(selector, component);
					}
					break;
				}
				case AngularEntityType.Directive: {
					const directive = {
						filePath: sourceFile.fileName,
						className: statementClass.name.getText(),
						isDeprecated: hasDeprecatedAnnotation(statementClass),
						properties: Object.fromEntries(
							angularEntity.exposedProperties.map((property) => [
								property.name,
								{ isDeprecated: hasDeprecatedAnnotation(property.propertyAst) }
							])
						)
					};

					for (const selector of angularEntity.selectors) {
						directivesMap.set(selector, directive);
					}
					break;
				}
			}
		}
	}

	mapping = {
		tsConfigFilePath,
		sourceFilePaths: program
			.getSourceFiles()
			.map((sourceFile) => sourceFile.fileName),
		components: componentsMap,
		directives: directivesMap
	};

	// TODO(netux): replace old mappings that have a matching tsconfig
	mappings.push(mapping);

	return mapping;
}

export const tryEnsureMappings = (filePath: string): boolean => {
	const mappings = getOrLoadMappings(path.resolve(filePath));
	return mappings != null;
};

export const getMappings = () => Object.freeze([...mappings]);

export function findAngularComponentInAllMappings(selector: string) {
	for (const mapping of getMappings()) {
		const component = mapping.components.get(selector);
		if (component == null) {
			continue;
		}

		return component;
	}
}

export function findAngularDirectiveAllMappings(selector: string) {
	for (const mapping of getMappings()) {
		const directive = mapping.directives.get(selector);
		if (directive == null) {
			continue;
		}

		return directive;
	}
}
