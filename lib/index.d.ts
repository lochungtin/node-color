declare class Color {
    static addZero: (value: string) => string;
    static isValidAlpha: (alpha: number) => boolean;
    static isValidArr: (valueArr: Array<number>) => boolean;
    static isValidHex: (hexcode: string) => boolean;
    static isValidValue: (value: number) => boolean;
    static arrToHex: (valueArr: Array<number>, includeHash?: boolean) => string;
    static hexToArr: (hexcode: string) => Array<number>;
    static valuesToHex: (rValue: number, gValue: number, bValue: number, includeHash?: boolean) => string;
    static mixByArray: (color1: Array<number>, color2: Array<number>, alpha?: number) => Array<number>;
    static mixByHex: (color1: string, color2: string, alpha?: number) => Array<number>;
    static mixByValue: (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, alpha?: number) => Array<number>;
}
export = Color;
