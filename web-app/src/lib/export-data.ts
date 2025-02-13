import { Color } from "../types"

export const  exportTailwind3 = (color : Color) => {
    let res = `\n'${color.nameId}': {`;
    Object.keys(color.allShades).forEach((el)=>{
        res += `\n"${el}": "${color.allShades[el]}",`;
    })
    res += "\n},"
    return res;
    
    
}


export const  exportTailwind4 = (color : Color) => {
    let res = `//${color.name}\n`;
    Object.keys(color.allShades).forEach((el)=>{
        res += `\n---color-${color.nameId}-${el}: ${color.allShades[el]};`;
    })
    res += "\n"
    return res;
    
    
}



//todo: add export svg & png
export const  exportCss = (color : Color) => {
    let res = `//${color.name}`;
    res += "\n\n//bg";
Object.keys(color.allShades).forEach((el)=>{
res += `
.bg-${color.nameId}-${el} {
background-color: ${color.allShades[el]};
}`;
})


    res += "\n//text";
Object.keys(color.allShades).forEach((el)=>{
res += `
.text-${color.nameId}-${el} {
color: ${color.allShades[el]};
}`;
})
    

    return res;
    
    
}

export const  exportScss = (color : Color) => {
    let res = `//${color.name}\n$colors:(`;
    Object.keys(color.allShades).forEach((el)=>{
        res += `\n"${color.nameId}-${el}" : ${color.allShades[el]},`;
    })
    res +=`
        );
            @each $name, $color in $colors {
            .bg-#{$name}{
                background-color: #{$color};
            } 
            .text-#{$name}{
                color: #{$color};
            } 
        }"`;

    return res;
    
    
}