import { colorNames } from "./data/colors";
import { tailwindColors } from "./data/tailwind-colors";
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

// Function to check if HSL values are valid
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

export const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toLowerCase()}`;
};

export const hexToRgb = (hex : string) => {

    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r,g,b];
}

// Example usage
const hexColor = "#3498db"; // A blue color
const rgbColor = hexToRgb(hexColor);
console.log(rgbColor); // Output: rgb(52, 152, 219)

// HSL to HEX conversion helper
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

export const getRandomColor = () => {

    const chars = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    let color = "#";
    for(let i=1;i<=6;i++){
        color += chars[Math.floor(Math.random()*chars.length)];
    }
    return color;
}





const getNameId = (name : string)=>{

    name = name.trim().toLowerCase();
    if(!name.includes(" ")) return name;

    const parts = name.split(" ");
    const len = parts.length;
    const chunkLen = len == 2 ? 3 : 2;
    let result = parts[len-1];
    for(let i = len - 2;i >= 0; i--){
        result = parts[i].slice(0,chunkLen) + "-" +result;
    }

    return result;
}



export const getShadeIdOfColor = (color : string) => {
    const rgb = hexToRgb(color);
    let closestShadeId = "";
    let minDistance = Infinity;

    Object.keys(tailwindColors).forEach((name) => {
    Object.keys(tailwindColors[name]).forEach((shadeId) => {
        const hex = tailwindColors[name][shadeId];
        const shadeRgb = hexToRgb(hex); 
        const distance = calculateColorDistance(rgb, shadeRgb);

        if (distance < minDistance) {
        minDistance = distance;
        closestShadeId = shadeId;
        }
    });
    });

    return parseInt(closestShadeId);
};

const calculateColorDistance = (rgb1 : number[], rgb2: number[]) => {
    const [r1, g1, b1] = rgb1;
    const [r2, g2, b2] = rgb2;
    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
};

export const getNameOfColor = (color : string) => {
    const rgb = hexToRgb(color);
    
    let closestColor = "";
    let minDistance = Infinity;
    colorNames.forEach((el) => {
        const distance = calculateColorDistance(rgb, el.rgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = el.name;
        }
    });
    //todo: abbrevitae in a good way formulate color to make it smaller
    //ex: persian-indigo ==> p-indigo as id
    return closestColor.replaceAll("-"," ");
};



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
    const name = getNameOfColor(hex).toLowerCase();
    const newColor : Color = {
        hexVal: hex,
        name: name,
        shadeId:shadeId, 
        nameId: getNameId(name),
        role: roles[colorIndex],
        allShades : getShadesOfColor(hex,shadeId)
    };
    return newColor;
}


export const updateColorData = (newColorHex: string, color: Color) => {
    const shadeId = getShadeIdOfColor(newColorHex);
    const name = getNameOfColor(newColorHex).toLowerCase();
    color = {
        hexVal: newColorHex,
        name: name,
        nameId: getNameId(name),
        shadeId:shadeId, 
        role: color.role,
        allShades : getShadesOfColor(newColorHex,shadeId)
    };
    return color;
}

