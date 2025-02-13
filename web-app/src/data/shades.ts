import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/utils";
import { tailwindColors } from "./tailwind-colors";
import { shadeIds } from "@/types";

const cosine_sim = (rgb1: number[], rgb2: number[]): number => {
    const dotProduct = rgb1[0] * rgb2[0] + rgb1[1] * rgb2[1] + rgb1[2] * rgb2[2];
    const mag1 = Math.sqrt(rgb1[0] ** 2 + rgb1[1] ** 2 + rgb1[2] ** 2);
    const mag2 = Math.sqrt(rgb2[0] ** 2 + rgb2[1] ** 2 + rgb2[2] ** 2);
    return dotProduct / (mag1 * mag2);
};

export const getColorAllShades = (hexColor : string, hexColorShadeId : number) => {
    const res : {[key:string] : string} = {};
    shadeIds.forEach((el)=>{
        res[el] = genOneColorShade(hexColor, hexColorShadeId, el);
    })

    return res;
}






const genOneColorShade = (hexColor : string, hexColorShadeId : number, newColorShadeId : number) => {

    const mags: { [key: string]: number[] } = {};

    // Calculate the color distances
    for (const key of Object.keys(tailwindColors)) {
        mags[key] = [0, 0, 0];
        const keyColor = tailwindColors[key][hexColorShadeId];
        const wantedColor = tailwindColors[key][newColorShadeId];

        // r distance
        mags[key][0] = -hexToRgb(keyColor)[0] + hexToRgb(wantedColor)[0];
        // g distance
        mags[key][1] = -hexToRgb(keyColor)[1] + hexToRgb(wantedColor)[1];
        // b distance
        mags[key][2] = -hexToRgb(keyColor)[2] + hexToRgb(wantedColor)[2];
    }

    let maxSim = -Infinity;
    for (const key of Object.keys(mags)) {
        const keyColor = tailwindColors[key][hexColorShadeId];
        const sim = cosine_sim(hexToRgb(hexColor), hexToRgb(keyColor));
        maxSim = Math.max(maxSim, sim);
    }

    let medDistances = [0, 0, 0];  
    let n = 0;

    for (const key of Object.keys(mags)) {
        const keyColor = tailwindColors[key][hexColorShadeId];
        
        const colorDistanceWeight = cosine_sim(hexToRgb(hexColor), hexToRgb(keyColor));
        
        let weight = colorDistanceWeight === maxSim ? 6 : 1;

        medDistances[0] += mags[key][0] * colorDistanceWeight * weight;
        medDistances[1] += mags[key][1] * colorDistanceWeight * weight;
        medDistances[2] += mags[key][2] * colorDistanceWeight * weight;
        
        n += weight;
    }

    let dist: number[];
    if (n !== 0) {
        dist = medDistances.map(distance => distance / n);
    } else {
        dist = [0, 0, 0];
    }

    let newResVect = hexToRgb(hexColor);
    newResVect[0] = Math.max(0, Math.min(255, Math.round(newResVect[0] + dist[0])));
    newResVect[1] = Math.max(0, Math.min(255, Math.round(newResVect[1] + dist[1])));
    newResVect[2] = Math.max(0, Math.min(255, Math.round(newResVect[2] + dist[2])));

    return rgbToHex(newResVect[0],newResVect[1],newResVect[2]);
};