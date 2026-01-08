import ts from 'typescript';

export enum AngularEntityType {
	Component = 'component',
	Directive = 'directive',
	Pipe = 'pipe'
}

export interface AngularEntityExposedProperty {
	name: string;
	propertyAst: ts.PropertyDeclaration;
}

export function getAngularEntity(classDeclaration: ts.ClassDeclaration):
	| {
			type: AngularEntityType.Component | AngularEntityType.Directive;
			selectors: string[];
			exposedProperties: AngularEntityExposedProperty[];
	  }
	| {
			type: AngularEntityType.Pipe;
			name: string;
	  }
	| undefined {
	const angularDecorator = findAngularDecorator(classDeclaration);
	if (angularDecorator != null) {
		if (
			angularDecorator.type === AngularEntityType.Component ||
			angularDecorator.type === AngularEntityType.Directive
		) {
			const componentDecoratorArgument = (
				angularDecorator.decoratorAst.expression as ts.CallExpression
			).arguments[0];
			if (componentDecoratorArgument == null) {
				return;
			}

			if (
				componentDecoratorArgument.kind !==
				ts.SyntaxKind.ObjectLiteralExpression
			) {
				// TODO(netux): support other syntax kinds. I.e. a variable containing the object being passed in
				return;
			}

			const selectorProperty = (
				componentDecoratorArgument as ts.ObjectLiteralExpression
			).properties.find((element): element is ts.PropertyAssignment => {
				if (element.kind !== ts.SyntaxKind.PropertyAssignment) {
					return false;
				}

				if (element.name?.getText() !== 'selector') {
					return false;
				}

				return true;
			});
			if (selectorProperty == null || selectorProperty.initializer == null) {
				return;
			}

			if (selectorProperty.initializer.kind !== ts.SyntaxKind.StringLiteral) {
				return;
			}

			const selectorPropertyValue =
				selectorProperty.initializer as ts.StringLiteral;

			return {
				type: angularDecorator.type,
				selectors: splitAngularSelectors(selectorPropertyValue.text),
				exposedProperties: getAngularElementExposedProperties(classDeclaration)
			};
		} else if (angularDecorator.type === AngularEntityType.Pipe) {
			const componentDecoratorArgument = (
				angularDecorator.decoratorAst.expression as ts.CallExpression
			).arguments[0];
			if (componentDecoratorArgument == null) {
				return;
			}

			if (
				componentDecoratorArgument.kind !==
				ts.SyntaxKind.ObjectLiteralExpression
			) {
				// TODO(netux): support other syntax kinds. I.e. a variable containing the object being passed in
				return;
			}

			const nameProperty = (
				componentDecoratorArgument as ts.ObjectLiteralExpression
			).properties.find((element): element is ts.PropertyAssignment => {
				if (element.kind !== ts.SyntaxKind.PropertyAssignment) {
					return false;
				}

				if (element.name?.getText() !== 'name') {
					return false;
				}

				return true;
			});
			if (nameProperty == null || nameProperty.initializer == null) {
				return;
			}

			if (nameProperty.initializer.kind !== ts.SyntaxKind.StringLiteral) {
				return;
			}

			const namePropertyValue = nameProperty.initializer as ts.StringLiteral;

			return {
				type: angularDecorator.type,
				name: namePropertyValue.text
			};
		}
	}

	const compiledAngularProperty = findCompiledAngularProperty(classDeclaration);
	if (compiledAngularProperty != null) {
		if (
			compiledAngularProperty.propertyAst.type == null ||
			compiledAngularProperty.propertyAst.type.kind !==
				ts.SyntaxKind.TypeReference
		) {
			return;
		}

		const propertyType = compiledAngularProperty.propertyAst
			.type as ts.TypeReferenceNode;

		if (
			(compiledAngularProperty.type === AngularEntityType.Component &&
				propertyType.typeName.getText() === 'i0.ɵɵComponentDeclaration') ||
			(compiledAngularProperty.type === AngularEntityType.Directive &&
				propertyType.typeName.getText() === 'i0.ɵɵDirectiveDeclaration')
		) {
			const selectorTypeArgument = propertyType.typeArguments?.[1];
			if (
				selectorTypeArgument == null ||
				selectorTypeArgument.kind !== ts.SyntaxKind.LiteralType
			) {
				return;
			}

			const selectorTypeArgumentLiteral = (
				selectorTypeArgument as ts.LiteralTypeNode
			).literal;
			if (selectorTypeArgumentLiteral.kind !== ts.SyntaxKind.StringLiteral) {
				return;
			}

			return {
				type: compiledAngularProperty.type,
				selectors: splitAngularSelectors(selectorTypeArgumentLiteral.text),
				exposedProperties: getAngularElementExposedProperties(classDeclaration)
			};
		} else if (
			compiledAngularProperty.type === AngularEntityType.Pipe &&
			propertyType.typeName.getText() === 'i0.ɵɵPipeDeclaration'
		) {
			const nameTypeArgument = propertyType.typeArguments?.[1];
			if (
				nameTypeArgument == null ||
				nameTypeArgument.kind !== ts.SyntaxKind.LiteralType
			) {
				return;
			}

			const nameTypeArgumentLiteral = (nameTypeArgument as ts.LiteralTypeNode)
				.literal;
			if (nameTypeArgumentLiteral.kind !== ts.SyntaxKind.StringLiteral) {
				return;
			}

			return {
				type: compiledAngularProperty.type,
				name: nameTypeArgumentLiteral.text
			};
		}
	}
}

function findAngularDecorator(classDeclaration: ts.ClassDeclaration):
	| {
			type: AngularEntityType;
			decoratorAst: ts.Decorator;
	  }
	| undefined {
	if (classDeclaration.modifiers == null) {
		return;
	}

	for (const modifier of classDeclaration.modifiers) {
		if (modifier.kind !== ts.SyntaxKind.Decorator) {
			continue;
		}

		const decorator = modifier as ts.Decorator;
		if (decorator.expression.kind !== ts.SyntaxKind.CallExpression) {
			continue;
		}

		const calledDecoratorName = (
			decorator.expression as ts.CallExpression
		).expression.getText();

		const angularDecoratorType = {
			Component: AngularEntityType.Component,
			Directive: AngularEntityType.Directive,
			Pipe: AngularEntityType.Pipe
		}[calledDecoratorName];

		if (angularDecoratorType == null) {
			continue;
		}

		// TODO(netux): check imports to make sure this is Angular's decorator.
		// Don't just base this on the decorator name.

		return {
			type: angularDecoratorType,
			decoratorAst: decorator
		};
	}
}

function findCompiledAngularProperty(classDeclaration: ts.ClassDeclaration):
	| {
			type: AngularEntityType;
			propertyAst: ts.PropertyDeclaration;
	  }
	| undefined {
	for (const member of classDeclaration.members) {
		if (member.kind !== ts.SyntaxKind.PropertyDeclaration) {
			continue;
		}

		const angularEntityType = {
			ɵcmp: AngularEntityType.Component,
			ɵdir: AngularEntityType.Directive,
			ɵpipe: AngularEntityType.Pipe
		}[member.name?.getText() ?? ''];
		if (angularEntityType == null) {
			continue;
		}

		return {
			type: angularEntityType,
			propertyAst: member as ts.PropertyDeclaration
		};
	}
}

function getAngularElementExposedProperties(
	classDeclaration: ts.ClassDeclaration
): AngularEntityExposedProperty[] {
	const properties: AngularEntityExposedProperty[] = [];

	// TODO(netux): get properties from inherited classes
	for (const member of classDeclaration.members) {
		if (member.kind !== ts.SyntaxKind.PropertyDeclaration) {
			continue;
		}

		const property = member as ts.PropertyDeclaration;

		if (
			property.modifiers?.some(
				(modifier) =>
					modifier.kind === ts.SyntaxKind.PrivateKeyword ||
					modifier.kind === ts.SyntaxKind.ProtectedKeyword
			)
		) {
			// Not exposed
			// NOTE: No visibility-modifier => public visibility
			continue;
		}

		const propertyName = property.name.getText();
		if (propertyName.startsWith('ɵ')) {
			// Angular internal
			continue;
		}

		properties.push({
			name: propertyName,
			propertyAst: property
		});
	}

	return properties;
}

const splitAngularSelectors = (selectors: string) =>
	selectors.split(',').map((selector) => selector.trim());

export function hasDeprecatedAnnotation(
	statementWithJsDoc: ts.HasJSDoc
): boolean {
	for (const jsDocOrJsDocTag of ts.getJSDocCommentsAndTags(
		statementWithJsDoc
	)) {
		const jsDocTags =
			jsDocOrJsDocTag.kind === ts.SyntaxKind.JSDocTag
				? [jsDocOrJsDocTag as ts.JSDocTag]
				: (jsDocOrJsDocTag as ts.JSDoc).tags ?? [];

		for (const jsDocTag of jsDocTags) {
			if (jsDocTag.tagName.getText() === 'deprecated') {
				return true;
			}
		}
	}
	return false;
}
