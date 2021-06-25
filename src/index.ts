class Color {

    static addZero = (value: string): string =>
        ('0' + value).slice(-2);

    static isValidAlpha = (alpha: number): boolean =>
        alpha >= 0 && alpha <= 1;

    static isValidArr = (valueArr: Array<number>): boolean =>
        valueArr.length === 3

    static isValidHex = (hexcode: string): boolean =>
        /[A-Ha-h0-9]+/.test(hexcode) && hexcode.replace('#', '').length === 6;

    static isValidValue = (value: number): boolean =>
        value >= 0 && value < 256;

    static arrToHex = (valueArr: Array<number>, includeHash: boolean = true): string => {
        if (!Color.isValidArr(valueArr))
            throw new Error(`Array length is not valid, array must be of length 3`);

        for (let i = 0; i < 3; ++i) {
            if (!Color.isValidValue(valueArr[i]))
                throw new Error(`Given values are not valid, values must be between 0 annd 255`);
        }

        return Color.valuesToHex(valueArr[0], valueArr[1], valueArr[2], includeHash);
    }

    static hexToArr = (hexcode: string): Array<number> => {
        if (!Color.isValidHex(hexcode))
            throw new Error(`Hexcode is not valid, received ${hexcode}`);

        return hexcode
            .replace('#', '')
            .match(/.{1,2}/g)?.map((val: string) => parseInt(val, 16)) || [0, 0, 0];
    }

    static valuesToHex = (rValue: number, gValue: number, bValue: number, includeHash: boolean = true): string => {
        if (!Color.isValidValue(rValue) || !Color.isValidValue(gValue) || !Color.isValidValue(bValue))
            throw new Error(`Given values are not valid, values must be between 0 annd 255`);

        return (includeHash ? '#' : '')
            + Color.addZero(rValue.toString(16))
            + Color.addZero(gValue.toString(16))
            + Color.addZero(bValue.toString(16));
    }

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

    static mixByHex = (color1: string, color2: string, alpha: number = 0.5): Array<number> =>
        Color.mixByArray(Color.hexToArr(color1), Color.hexToArr(color2), alpha);

    static mixByValue = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, alpha: number = 0.5): Array<number> =>
        Color.mixByArray([r1, g1, b1], [r2, g2, b2], alpha);
}

export = Color;