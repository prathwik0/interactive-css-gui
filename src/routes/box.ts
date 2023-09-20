/**
 * Type Unit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh'
 */
type Unit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';

/**
 * BoxModelPropertyValues is a class that represents the values of a box model property such as width, padding, border etc.
 */
class BoxModelPropertyValues {
	selected: 'numeric' | 'string' = 'numeric';
	string: 'auto' | 'max-content' | 'min-content' = 'auto';
	numeric: { num: number; unit: Unit } = {
		num: 0,
		unit: 'px',
	};
}

/**
 * BoxProperties is a class with display = block and box model properties
 */
class BoxProperties {
	boxModel: {
		width: BoxModelPropertyValues;
		height: BoxModelPropertyValues;
		padding: BoxModelPropertyValues;
		border: BoxModelPropertyValues;
		margin: BoxModelPropertyValues;
	} = {
		width: new BoxModelPropertyValues(),
		height: new BoxModelPropertyValues(),
		padding: new BoxModelPropertyValues(),
		border: new BoxModelPropertyValues(),
		margin: new BoxModelPropertyValues(),
	};

	constructor() {
		this.boxModel.width.selected = 'numeric';
		this.boxModel.width.numeric.num = 15;
		this.boxModel.width.numeric.unit = 'rem';

		this.boxModel.height.selected = 'numeric';
		this.boxModel.height.numeric.num = 15;
		this.boxModel.height.numeric.unit = 'rem';

		this.boxModel.border.selected = 'numeric';
		this.boxModel.border.numeric.num = 0.25;
		this.boxModel.border.numeric.unit = 'rem';
	}
}

export class BlockProperties extends BoxProperties {
	display: 'block' = 'block';
}

/**
 * FlexProperties is a class with display = flex, box model properties and flex properties
 */
export class FlexProperties extends BoxProperties {
	display: 'flex' = 'flex';
	flex: {
		'flex-direction': 'row' | 'row-reverse' | 'column' | 'column-reverse';
		'flex-wrap': 'nowrap' | 'wrap' | 'wrap-reverse';
		'justify-content'?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
		'align-items'?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
		'align-content'?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	} = {
		'flex-direction': 'row',
		'flex-wrap': 'nowrap',
	};
}

/**
 * Stack is a class that represents a stack of boxes
 */
export class Stack {
	currentBox: BlockProperties | FlexProperties = new FlexProperties();
	count: number = 0;
	children: Stack[] = [];
}

/* ---------------------------------------------------------------------- */
/* ----------------------------- EXAMPLES ------------------------------- */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* ----------------------------- OPTIONS! ------------------------------- */
/* ---------------------------------------------------------------------- */

type OptionsFlex = 'flex-direction' | 'flex-wrap' | 'justify-content' | 'align-items' | 'align-content';

interface OptionsBoxModelProperty {
	options: string[];
	string: string[];
	numeric: {
		options: string[];
		px: {
			range: [number, number];
			step: number;
		};
		rem: {
			range: [number, number];
			step: number;
		};
		em: {
			range: [number, number];
			step: number;
		};
		'%': {
			range: [number, number];
			step: number;
		};
		vw: {
			range: [number, number];
			step: number;
		};
		vh: {
			range: [number, number];
			step: number;
		};
	};
}

type Options = {
	display: {
		options: string[];
	};
	flex: {
		options: OptionsFlex[];
		'flex-direction': {
			options: ('row' | 'row-reverse' | 'column' | 'column-reverse')[];
		};
		'flex-wrap': {
			options: ('wrap' | 'nowrap' | 'wrap-reverse')[];
		};
		'justify-content': {
			options: ('initial' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly')[];
		};
		'align-items': {
			options: ('flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline')[];
		};
		'align-content': {
			options: ('flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly')[];
		};
	};
	boxModel: {
		options: string[];
		width: OptionsBoxModelProperty;
		height: OptionsBoxModelProperty;
		padding: OptionsBoxModelProperty;
		border: OptionsBoxModelProperty;
		margin: OptionsBoxModelProperty;
	};
};

export const options: Options = {
	display: {
		options: ['block', 'inline', 'inline-block', 'grid', 'flex', 'contents', 'none'],
	},
	flex: {
		options: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content'],
		'flex-direction': {
			options: ['row', 'row-reverse', 'column', 'column-reverse'],
		},
		'flex-wrap': {
			options: ['wrap', 'nowrap', 'wrap-reverse'],
		},
		'justify-content': {
			options: ['initial', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
		},
		'align-items': {
			options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
		},
		'align-content': {
			options: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly'],
		},
	},
	boxModel: {
		options: ['width', 'height', 'padding', 'border', 'margin'],
		width: {
			options: ['numeric', 'string'],
			string: ['auto', 'max-content', 'min-content'],
			numeric: {
				options: ['px', 'rem', 'em', '%', 'vw', 'vh'],
				px: {
					range: [0, 1600],
					step: 1,
				},
				rem: {
					range: [0, 80],
					step: 0.25,
				},
				em: {
					range: [0, 80],
					step: 0.25,
				},
				'%': {
					range: [0, 100],
					step: 1,
				},
				vw: {
					range: [0, 100],
					step: 1,
				},
				vh: {
					range: [0, 100],
					step: 1,
				},
			},
		},
		height: {
			options: ['numeric', 'string'],
			string: ['auto', 'max-content', 'min-content'],
			numeric: {
				options: ['px', 'rem', 'em', '%', 'vw', 'vh'],
				px: {
					range: [0, 1600],
					step: 1,
				},
				rem: {
					range: [0, 80],
					step: 0.25,
				},
				em: {
					range: [0, 80],
					step: 0.25,
				},
				'%': {
					range: [0, 100],
					step: 1,
				},
				vw: {
					range: [0, 100],
					step: 1,
				},
				vh: {
					range: [0, 100],
					step: 1,
				},
			},
		},
		padding: {
			options: ['numeric', 'string'],
			string: ['auto', 'max-content', 'min-content'],
			numeric: {
				options: ['px', 'rem', 'em', '%', 'vw', 'vh'],
				px: {
					range: [0, 100],
					step: 1,
				},
				rem: {
					range: [0, 8],
					step: 0.0625,
				},
				em: {
					range: [0, 8],
					step: 0.0625,
				},
				'%': {
					range: [0, 20],
					step: 0.2,
				},
				vw: {
					range: [0, 20],
					step: 0.2,
				},
				vh: {
					range: [0, 20],
					step: 0.2,
				},
			},
		},
		border: {
			options: ['numeric', 'string'],
			string: ['auto', 'max-content', 'min-content'],
			numeric: {
				options: ['px', 'rem', 'em', '%', 'vw', 'vh'],
				px: {
					range: [0, 25],
					step: 0.25,
				},
				rem: {
					range: [0, 8],
					step: 0.0625,
				},
				em: {
					range: [0, 4],
					step: 0.0625,
				},
				'%': {
					range: [0, 10],
					step: 0.1,
				},
				vw: {
					range: [0, 5],
					step: 0.05,
				},
				vh: {
					range: [0, 5],
					step: 0.05,
				},
			},
		},
		margin: {
			options: ['numeric', 'string'],
			string: ['auto', 'max-content', 'min-content'],
			numeric: {
				options: ['px', 'rem', 'em', '%', 'vw', 'vh'],
				px: {
					range: [0, 100],
					step: 1,
				},
				rem: {
					range: [0, 8],
					step: 0.0625,
				},
				em: {
					range: [0, 8],
					step: 0.0625,
				},
				'%': {
					range: [0, 20],
					step: 0.2,
				},
				vw: {
					range: [0, 20],
					step: 0.2,
				},
				vh: {
					range: [0, 20],
					step: 0.2,
				},
			},
		},
	},
};

/* ---------------------------------------------------------------------- */
/* ----------------------------- THE END! ------------------------------- */
/* ---------------------------------------------------------------------- */
