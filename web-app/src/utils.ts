import { Color, roles } from "./types";


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



export const getShadesOfColor = (color : string, shadeId: number) => {
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

