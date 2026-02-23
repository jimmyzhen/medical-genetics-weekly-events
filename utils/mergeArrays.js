/**
 * Merge 2 arrays of equal length into an array of objects.
 * Filters out empty values from arr1, keeping only entries with non-empty keys.
 *
 * @param {Array} arr1 - Array of keys (e.g., dates)
 * @param {Array} arr2 - Array of values (e.g., names)
 * @param {string} key1 - Property name for arr1 values
 * @param {string} key2 - Property name for arr2 values
 * @returns {Array<Object>} Merged array of { [key1]: value, [key2]: value }
 */
export default function mergeArrays(arr1, arr2, key1 = 'key1', key2 = 'key2') {
    if (arr1.length !== arr2.length) {
        throw new Error('Arrays must be of equal length');
    }

    return arr1.reduce((result, value, index) => {
        if (value.length) {
            result.push({ [key1]: value, [key2]: arr2[index] });
        }
        return result;
    }, []);
}
