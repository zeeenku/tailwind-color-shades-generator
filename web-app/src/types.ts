export type Color = {
    hexVal : string,
    name : string,
    shadeId : number,
    role : string,
    allShades : { [key: string]: string } 
}

export const shadesIds = [50,100,200,300,400,500,600,700,800,900,950];
export const roles = ["primary","secondary","tertiary","fourhtly","fifthy"];
