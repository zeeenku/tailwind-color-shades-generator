import { Color, roles } from "./types";



export const isValidHex = (color : string) => {
    if(color[0] !== "#" || color.length < 4 || color.length > 7) return false;

    color = color.toLowerCase();
    const hexChars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    for(let i =1;i<color.length;i++){
        if(!hexChars.includes(color[i])){
            return false;
        }
    }

    return true;
}


export const cleanColorString = (colorString: string) => {
    return colorString
      .trim()
      .replace(/[^\d,°%]/g, "") // Remove invalid characters
      .replace(/rgb\(|hsl\(|\)/g, "") // Remove rgb() or hsl()
      .split(/\s*,\s*|\s+/); // Split by commas or spaces
  };

export const isValidRgb = (rgbParts: string[]) => {
    if (rgbParts.length !== 3) return false;
    return rgbParts.every(part => {
    const value = parseInt(part);
    return !isNaN(value) && value >= 0 && value <= 255;
    });
};

// Function to check if HSL values are valid
export const isValidHsl = (hslParts: string[]) => {
    if (hslParts.length !== 3) return false;
    const h = parseInt(hslParts[0].replace("°", ""));
    const s = parseInt(hslParts[1].replace("%", ""));
    const l = parseInt(hslParts[2].replace("%", ""));
    return (
    !isNaN(h) &&
    !isNaN(s) &&
    !isNaN(l) &&
    s >= 0 && s <= 100 &&
    l >= 0 && l <= 100
    );
};

const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
};

// HSL to HEX conversion helper
const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return rgbToHex(r, g, b);
};

export const getRandomColor = () => {

    const chars = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    let color = "#";
    for(let i=1;i<=6;i++){
        color += chars[Math.floor(Math.random()*chars.length)];
    }
    return color;
}

export const getShadeIdOfColor = (color : string) => {
    return 400;
}

export const getNameOfColor = (color : string) => {
    return "Red";
}



export const getShadesOfColor = (hexVal : string, shadeId: number) => {
    return {};
}



export const getNewRandomColorData = (colorIndex : number) => {

            // gen random hex
            // detect name from hex code
            // detect best id based on color
            // detect role based on order
        
    const hex = getRandomColor();
    const shadeId = getShadeIdOfColor(hex);
    const newColor : Color = {
        hexVal: hex,
        name: getNameOfColor(hex),
        shadeId:shadeId, 
        role: roles[colorIndex],
        allShades : getShadesOfColor(hex,shadeId)
    };
    return newColor;
}






export const updateColorData = (newColorHex: string, color: Color) => {
    const shadeId = getShadeIdOfColor(newColorHex);
    color = {
        hexVal: newColorHex,
        name: getNameOfColor(newColorHex),
        shadeId:shadeId, 
        role: color.role,
        allShades : getShadesOfColor(newColorHex,shadeId)
    };
    return color;
}

