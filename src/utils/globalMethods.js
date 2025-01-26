
/**  @function
 * * Handling the null case and set to safe
 *
 * @name nullSafe
 * @param {function} func
 * @param {*} fallbackValue
 * @returns {*} the value to set safe the method
 */
export function nullSafe(func, fallbackValue) {
	try {
		const value = func();
		return value === null || value === undefined ? fallbackValue : value;
	} catch (e) {
		return fallbackValue;
	}
};

/**
 * Computes the content size of an element based on its styles.
 * Assumes box-sizing: border-box.
 *
 * @function computeContentSize
 * @param {Object} styles - The CSS styles of the element.
 */
export function computeContentSize(styles) {
	// 1) Ricaviamo i valori numerici
	const numericHeight = parseFloat(styles.height) || 0;
	const numericWidth = parseFloat(styles.width) || 0;
	const numericBorderTop = parseFloat(styles.borderTop) || 0;
	const numericBorderBottom = parseFloat(styles.borderBottom) || 0;
	const numericBorderLeft = parseFloat(styles.borderLeft) || 0;
	const numericBorderRight = parseFloat(styles.borderRight) || 0;
	const numericPaddingTop = parseFloat(styles.paddingTop) || 0;
	const numericPaddingBottom = parseFloat(styles.paddingBottom) || 0;
	const numericPaddingLeft = parseFloat(styles.paddingLeft) || 0;
	const numericPaddingRight = parseFloat(styles.paddingRight) || 0;

	// 2) Calcoliamo la content area (ipotizzando box-sizing: border-box)
	const contentHeight = numericHeight
		+ numericPaddingTop
		+ numericPaddingBottom
		+ numericBorderTop
		+ numericBorderBottom;
	const contentWidth = numericWidth
		+ numericPaddingLeft
		+ numericPaddingRight
		+ numericBorderLeft
		+ numericBorderRight;

	const height = Math.floor(contentHeight);
	const width = Math.floor(contentWidth);

	function formatValue(string) {
		return string.replace('px', '');
	}

	return {
		height,
		width,
		margin: {
			top: formatValue(styles.marginTop),
			right: formatValue(styles.marginRight),
			bottom: formatValue(styles.marginBottom),
			left: formatValue(styles.marginLeft),
		},
		padding: {
			top: formatValue(styles.paddingTop),
			right: formatValue(styles.paddingRight),
			bottom: formatValue(styles.paddingBottom),
			left: formatValue(styles.paddingLeft),
		},
	};
}

