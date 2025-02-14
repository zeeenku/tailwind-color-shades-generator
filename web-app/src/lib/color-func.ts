import { ColorName, colorNames } from "@/data/colors";
import { getColorAllShades } from "@/lib/gen-shades";
import { tailwindColors } from "@/data/tailwind-colors";
import { Color, roles } from "@/types";
import { hexToRgb } from "./color-formats";



export const getColorFormatRecom = () => {

    const data = {
        "rgb" : [
            "171 108 135",
            "171, 113, 115",
            "rgb(11, 138, 131)",
        ],

        "hsl" : [
            "hsl(0, 100%, 50%)",
            "4°, 25%, 56%",
            "4, 25%, 56%",
        ],
    }
    const type = Math.floor(Math.random() * 100) % 2 == 0 ? "rgb" : "hsl";
    const index = Math.floor(Math.random() * 100) % 3;
    return {type, example: data[type][index]};
}

export const getRandomColor = () => {
    const chars = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
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
    colorNames.forEach((el : ColorName) => {
        const distance = calculateColorDistance(rgb, el.rgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = el.name;
        }
    });
    return closestColor.replaceAll("-"," ");
};



export const getShadesOfColor = (hexVal : string, shadeId: number) => {
    return getColorAllShades(hexVal, shadeId);
}


export const getNewRandomColorData = (colorIndex : number) => {
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


