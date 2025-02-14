import Color from "colorjs.io";

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
    colorString = colorString.trim();

    colorString = colorString
    .replace(/rgb\(|hsl\(|\)/g, "")
    .replace(/\s+/g, ","); 

    if (colorString.includes(",")) {
    return colorString.split(",").map(el => el.trim()).filter(el=>el.length);
    } else {
    return colorString.split(/\s+/).map(el => el.trim()).filter(el=>el.length);
    }
};

export const isValidRgb = (rgbParts: string[]) => {
    if (rgbParts.length !== 3) return false;
    return rgbParts.every(part => {
    const value = parseInt(part);
    return !isNaN(value) && value >= 0 && value <= 255;
    });
};


export const isValidHsl = (hslParts: string[]) => {
    if (hslParts.length !== 3) return false;
    if(!hslParts[1].includes("%") || !hslParts[2].includes("%")) return false;
    const h = parseInt(hslParts[0].replace("°", ""));
    const s = parseInt(hslParts[1].replace("%", ""));
    const l = parseInt(hslParts[2].replace("%", ""));
    return (
    !isNaN(h) &&
    !isNaN(s) &&
    !isNaN(l) &&
    h>= 0 && h<= 360 &&
    s >= 0 && s <= 100 &&
    l >= 0 && l <= 100
    );
};


export const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const hsl: number[] = [0, 0, (max + min) / 2];  // Initialize lightness
    
    const delta = max - min;
    
    if (delta === 0) {
        hsl[0] = hsl[1] = 0;  // No hue or saturation if all values are the same
    } else {
        // Calculate saturation
        hsl[1] = hsl[2] > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        
        // Calculate hue
        switch (max) {
            case r: hsl[0] = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: hsl[0] = (b - r) / delta + 2; break;
            case b: hsl[0] = (r - g) / delta + 4; break;
        }
        
        hsl[0] /= 6;
    }

    return [hsl[0] * 360, hsl[1] * 100, hsl[2] * 100];  // Return as [H, S, L] with percentages
};
export const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toLowerCase()}`;
};



export const hexToRgb = (hex: string): [number, number, number] => { 

    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    else if (hex.length === 4) {
        hex = hex.split('').map((char, index) => index % 2 === 0 ? char + char : char).join('');
    }
    else if (hex.length === 5) {
        hex = hex.split('').map((char, index) => index % 2 === 0 ? char + char : char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}


export const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let rgb: number[] = [0, 0, 0];

    if (h < 60) rgb = [c, x, 0];
    else if (h < 120) rgb = [x, c, 0];
    else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c];
    else if (h < 300) rgb = [x, 0, c];
    else rgb = [c, 0, x];

    rgb = rgb.map((value) => Math.round((value + m) * 255));

    return rgb;
};


export const hexToHsl = (hex : string)=>{
    const [r,g,b] = hexToRgb(hex);
    return rgbToHsl(r,g,b);
}


export const hslToHex = (h: number, s: number, l: number) => {
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


