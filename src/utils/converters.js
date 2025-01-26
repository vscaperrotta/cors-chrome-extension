
/**
 * Converts PX to REM, given a custom baseRem value.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseRem - The number of px in 1rem.
 * @returns {number} The converted value in REM.
 */
function pxToRem(px, baseRem) {
  return px / baseRem;
}

/**
 * Converts REM to PX, given a custom baseRem value.
 * @param {number} rem - The value in REM to be converted.
 * @param {number} baseRem - The number of px in 1rem.
 * @returns {number} The converted value in PX.
 */
function remToPx(rem, baseRem) {
  return rem * baseRem;
}

/**
 * Converts PX to EM, given a custom baseEm value.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseEm - The number of px in 1em.
 * @returns {number} The converted value in EM.
 */
function pxToEm(px, baseEm) {
  return px / baseEm;
}

/**
 * Converts EM to PX, given a custom baseEm value.
 * @param {number} em - The value in EM to be converted.
 * @param {number} baseEm - The number of px in 1em.
 * @returns {number} The converted value in PX.
 */
function emToPx(em, baseEm) {
  return em * baseEm;
}

/**
 * Converts PX to percentage, given a container width in px.
 * @param {number} px - The value in PX to be converted.
 * @param {number} containerWidth - The container width in px for relative % calculation.
 * @returns {number} The converted value in % (0-100).
 */
function pxToPct(px, containerWidth) {
  return (px / containerWidth) * 100;
}

/**
 * Converts percentage to PX, given a container width in px.
 * @param {number} pct - The value in percentage to be converted.
 * @param {number} containerWidth - The container width in px for relative % calculation.
 * @returns {number} The converted value in PX.
 */
function pctToPx(pct, containerWidth) {
  return (pct / 100) * containerWidth;
}

/**
 * Converts a "base unit" to PX, given a baseUnit factor.
 * @param {number} base - The value in base units to be converted.
 * @param {number} baseUnit - The factor that 1 base unit represents in px.
 * @returns {number} The converted value in PX.
 */
function baseUnitToPx(base, baseUnit) {
  return base * baseUnit;
}

/**
 * Converts PX to "base unit", given a baseUnit factor.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseUnit - The factor that 1 base unit represents in px.
 * @returns {number} The converted value in base units.
 */
function pxToBaseUnit(px, baseUnit) {
  return px / baseUnit;
}

/**
 * Converts a value using the "forward" direction, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @param {number} value - The number to convert.
 * @param {object} bases - An object containing all base values (baseRem, baseEm, containerWidth, baseUnit).
 * @returns {number} The converted result.
 */
export function directConversion(selectedConversion, value, { baseRem, baseEm, containerWidth, baseUnit }) {
  switch (selectedConversion) {
    case 'PX_REM':
      return pxToRem(value, baseRem);
    case 'REM_PX':
      return remToPx(value, baseRem);
    case 'PX_EM':
      return pxToEm(value, baseEm);
    case 'EM_PX':
      return emToPx(value, baseEm);
    case 'PX_PCT':
      return pxToPct(value, containerWidth);
    case 'PCT_PX':
      return pctToPx(value, containerWidth);
    case 'BASE_PX':
      return baseUnitToPx(value, baseUnit);
    case 'PX_BASE':
      return pxToBaseUnit(value, baseUnit);
    default:
      return 0;
  }
}

/**
 * Converts a value using the "reverse" direction, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @param {number} value - The number to convert.
 * @param {object} bases - An object containing all base values (baseRem, baseEm, containerWidth, baseUnit).
 * @returns {number} The converted result in the opposite direction.
 */
export function reverseConversion(selectedConversion, value, { baseRem, baseEm, containerWidth, baseUnit }) {
  switch (selectedConversion) {
    case 'PX_REM':
      // reverse = REM -> PX
      return remToPx(value, baseRem);
    case 'REM_PX':
      // reverse = PX -> REM
      return pxToRem(value, baseRem);
    case 'PX_EM':
      // reverse = EM -> PX
      return emToPx(value, baseEm);
    case 'EM_PX':
      // reverse = PX -> EM
      return pxToEm(value, baseEm);
    case 'PX_PCT':
      // reverse = % -> PX
      return pctToPx(value, containerWidth);
    case 'PCT_PX':
      // reverse = PX -> %
      return pxToPct(value, containerWidth);
    case 'BASE_PX':
      // reverse = PX -> base unit
      return pxToBaseUnit(value, baseUnit);
    case 'PX_BASE':
      // reverse = base unit -> PX
      return baseUnitToPx(value, baseUnit);
    default:
      return 0;
  }
}

/**
 * Returns dynamic labels and placeholders for the two input fields, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @returns {{label1: string, label2: string, placeholder1: string, placeholder2: string}}
 */
export function getLabelsAndPlaceholders(selectedConversion) {
  switch (selectedConversion) {
    case 'PX_REM':
      return {
        placeholder1: 'PX',
        placeholder2: 'REM'
      };
    case 'REM_PX':
      return {
        placeholder1: 'REM',
        placeholder2: 'PX'
      };
    case 'PX_EM':
      return {
        placeholder1: 'PX',
        placeholder2: 'EM'
      };
    case 'EM_PX':
      return {
        placeholder1: 'EM',
        placeholder2: 'PX'
      };
    case 'PX_PCT':
      return {
        placeholder1: 'PX',
        placeholder2: '%'
      };
    case 'PCT_PX':
      return {
        placeholder1: '%',
        placeholder2: 'PX'
      };
    case 'BASE_PX':
      return {
        placeholder1: 'base unit',
        placeholder2: 'PX'
      };
    case 'PX_BASE':
      return {
        placeholder1: 'PX',
        placeholder2: 'base unit'
      };
    default:
      return {
        placeholder1: 'value',
        placeholder2: 'value'
      };
  }
}