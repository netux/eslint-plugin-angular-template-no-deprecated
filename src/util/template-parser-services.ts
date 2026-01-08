import {
	AbsoluteSourceSpan,
	AST,
	Node,
	ParseLocation,
	ParseSourceSpan
} from '@angular/compiler';
import { TSESTree } from '@typescript-eslint/utils';

interface AstOrNode {
	type: string;
	parent?: AstOrNode;
	sourceSpan?: ParseSourceSpan | AbsoluteSourceSpan;
}

function findAstParentNode(ast: AST & { type: string }) {
	let nodeParent: AstOrNode | undefined = ast;
	while (
		nodeParent != null &&
		(nodeParent.sourceSpan == null ||
			// AbsoluteSourceSpan instead of ParseSourceSpan
			typeof nodeParent.sourceSpan.start === 'number')
	) {
		nodeParent = nodeParent.parent;
	}

	return nodeParent as Node;
}

/**
 * @note This might not be generic. It was only tested with a BindingPipe AST.
 */
export const convertAstSpanToLoc = (
	ast: AST,
	span: AbsoluteSourceSpan
): TSESTree.SourceLocation | undefined => {
	const parentProgram = findAstParentNode(ast as AST & { type: string });

	const beginningOfTheFile = new ParseLocation(
		parentProgram.sourceSpan.start.file,
		0,
		0,
		0
	);

	const spanStart = beginningOfTheFile.moveBy(span.start);
	const spanEnd = beginningOfTheFile.moveBy(span.end);

	return {
		start: {
			line: spanStart.line,
			column: spanStart.col
		},
		end: {
			line: spanEnd.line,
			column: spanEnd.col
		}
	};
};
