class Color {

    /**
     * appends an additional '0' if the numeric value of the parameter is < 10
     * @param {string} value    - value to be processed
     * @returns {string}        - processed valued
     */
    static addZero = (value: string): string =>
        ('0' + value).slice(-2);

    /**
     * validates the alpha value (between 0 and 1, inclusive)
     * @param {number} alpha    - alpha value
     * @returns {boolean}       - valid flag
     */
    static isValidAlpha = (alpha: number): boolean =>
        alpha >= 0 && alpha <= 1;

    /**
     * validates the color array (length of array === 3)
     * @param {Array<number>} valueArr  - color array
     * @returns {boolean}               - valid flag
     */
    static isValidArr = (valueArr: Array<number>): boolean =>
        valueArr.length === 3

    /**
     * validates the hexcode
     * - only A-F, a-f, or 0-9, characters allowed
     * - of length 6 after discarding the '#' symbol
     * @param {string} hexcode  - hexcode
     * @returns {boolean}       - valid flag
     */
    static isValidHex = (hexcode: string): boolean =>
        /[A-Fa-f0-9]+/.test(hexcode) && hexcode.replace('#', '').length === 6;

    /**
     * validates the color value (between 0 and 255, inclusive)
     * @param {number} value    - color value
     * @returns {boolean}       - valid flag
     */
    static isValidValue = (value: number): boolean =>
        value >= 0 && value < 256;

    /**
     * converts a color array to a color hexcode
     * @param {Array<number>} valueArr  - color array
     * @param {boolean} includeHash     - (optional) include '#' in the return hexcode
     * @returns {string}                - hexcode
     */
    static arrToHex = (valueArr: Array<number>, includeHash: boolean = true): string => {
        if (!Color.isValidArr(valueArr))
            throw new Error(`Array length is not valid, array must be of length 3`);

        for (let i = 0; i < 3; ++i) {
            if (!Color.isValidValue(valueArr[i]))
                throw new Error(`Given values are not valid, values must be between 0 annd 255`);
        }

        return Color.valuesToHex(valueArr[0], valueArr[1], valueArr[2], includeHash);
    }

    /**
     * converts a color hexcode to a color array
     * @param {string} hexcode  - hexcode
     * @returns {Array<number>} - color array
     */
    static hexToArr = (hexcode: string): Array<number> => {
        if (!Color.isValidHex(hexcode))
            throw new Error(`Hexcode is not valid, received ${hexcode}`);

        return hexcode
            .replace('#', '')
            .match(/.{1,2}/g)?.map((val: string) => parseInt(val, 16)) || [0, 0, 0];
    }

    /**
     * converts color values to a color hexcode
     * @param {number} rValue           - red value
     * @param {number} gValue           - green value
     * @param {number} bValue           - blue value
     * @param {boolean} includeHash     - (optional) include '#' in the return hexcode
     * @returns {string}                - hexcode
     */
    static valuesToHex = (rValue: number, gValue: number, bValue: number, includeHash: boolean = true): string => {
        if (!Color.isValidValue(rValue) || !Color.isValidValue(gValue) || !Color.isValidValue(bValue))
            throw new Error(`Given values are not valid, values must be between 0 annd 255`);

        return (includeHash ? '#' : '')
            + Color.addZero(rValue.toString(16))
            + Color.addZero(gValue.toString(16))
            + Color.addZero(bValue.toString(16));
    }

    /**
     * mixes two colors with adjustable alpha for color1
     * @param {Array<number>} color1    - color array for color1
     * @param {Array<number>} color2    - color array for color2
     * @param {number} alpha            - alpha value for color1
     * @returns {Array<number>}         - mixed result
     */
    static mixByArray = (color1: Array<number>, color2: Array<number>, alpha: number = 0.5): Array<number> => {
        if (!Color.isValidArr(color1))
            throw new Error(`Array length is not valid, array must be of length 3`);

        for (let i = 0; i < 3; ++i) {
            if (!Color.isValidValue(color1[i]))
                throw new Error(`Given values are not valid, values must be between 0 annd 255`);
        }

        if (!Color.isValidArr(color2))
            throw new Error(`Array length is not valid, array must be of length 3`);

        for (let i = 0; i < 3; ++i) {
            if (!Color.isValidValue(color2[i]))
                throw new Error(`Given values are not valid, values must be between 0 annd 255`);
        }

        if (!Color.isValidAlpha(alpha))
            throw new Error('Alpha value is not valid, alpha must be between 0 and 1');

        return color2.map((val: number, index: number) => Math.round(val * (1 - alpha) + color1[index] * alpha))
    }

    /**
     * mixes two colors with adjustable alpha for color1
     * @param {string} color1   - hexcode for color1 
     * @param {string} color2   - hexcode for color2
     * @param {numnber} alpha   - alpha value for color1
     * @returns {Array<number>} - mixed result
     */
    static mixByHex = (color1: string, color2: string, alpha: number = 0.5): Array<number> =>
        Color.mixByArray(Color.hexToArr(color1), Color.hexToArr(color2), alpha);

    /**
     * mixes two colors with adjustable alpha for color1
     * @param {number} r1       - red value for color1
     * @param {number} g1       - green value for color1
     * @param {number} b1       - blue value for color1
     * @param {number} r2       - red value for color2
     * @param {number} g2       - green value for color2
     * @param {number} b2       - blue value for color2
     * @param {number} alpha    - alpha value for color1 
     * @returns {Array<number>} - mixed result
     */
    static mixByValue = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, alpha: number = 0.5): Array<number> =>
        Color.mixByArray([r1, g1, b1], [r2, g2, b2], alpha);
}

export = Color;