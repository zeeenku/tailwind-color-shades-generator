import { configureStore } from '@reduxjs/toolkit';
import {Color, roles} from "@/types";
import { getNewRandomColorData, getShadesOfColor, updateColorData } from './lib/color-func';


export type StateType = {
    colors : Color[],
};


const initialState: StateType = {
    colors: [
    ],
};


export enum Actions{
    ADDCOLOR = "ADDCOLOR",
    REMOVECOLOR = "REMOVECOLOR",
    CHANGECOLORNAMEID = "CHANGECOLORNAMEID",
    CHANGECOLORSHADEID = "CHANGECOLORSHADEID",
    UPDATEROLE = "UPDATEROLE",
    UPDATECOLOR = "UPDATECOLOR",
}



export const addColor = () => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        dispatch({
            type: Actions.ADDCOLOR,
            // the role is adjust the order of creation
            payload: getNewRandomColorData(state.colors.length),
        });
    }
};


export const removeColor = (role: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        
        const newColors = state.colors
            // if only there is 1 element then delete ntg
            .filter((el: Color) => el.role !== role || state.colors.length == 1)
            .map((el: Color, index: number) => {
                return {
                    ...el,
                    role: roles[index]
                };
            });

        dispatch({
            type: Actions.REMOVECOLOR,
            payload: newColors,
        });
    };
};



export const updateColor = (colorHex: string, role: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        
        const newColors = state.colors
            .map((el: Color) => {
                if(el.role == role){
                    el = updateColorData(colorHex, el);
                }
                return el;
            });

        // send req to backend to inc color shades counter
        //todo: to update later
        setTimeout(() => {
            if (colorHex === getState().colors[role].hexVal) {
                fetch("/add-color", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ color: colorHex })
                })
                .then(response => response.json())
                .then(data => {
                    console.log("New color added:", data);
                })
                .catch(e => {
                    console.error("Error adding color:", e);
                });
            }
        }, 1200);


        dispatch({
            type: Actions.UPDATECOLOR,
            payload: newColors,
        });
    };
};




export const changeColorNameId = (nameId: string, role: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        
        const newColors = state.colors
            .map((el: Color) => {
                if(el.role !== role) return el;

                return { ...el, nameId }; 
            });

        dispatch({
            type: Actions.CHANGECOLORNAMEID,
            payload: newColors,
        });
    };
};


export const changeColorShadeId = (shadeId: number, role: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        
        const newColors = state.colors
            .map((el: Color) => {
                if(el.role !== role) return el;
                const allShades = getShadesOfColor(el.hexVal, shadeId);
                return { ...el, shadeId , allShades }; 
            });

        dispatch({
            type: Actions.CHANGECOLORSHADEID,
            payload: newColors,
        });
    };

    
};


const reducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case Actions.ADDCOLOR:
            return {
                ...state,
                colors: [...state.colors, action.payload], 
            };

        case Actions.REMOVECOLOR:
            return {
                ...state,
                colors: action.payload, 
            };

        case Actions.UPDATECOLOR:
            return {
                ...state,
                colors: action.payload, 
            };

        case Actions.CHANGECOLORNAMEID:
            return {
                ...state,
                colors: action.payload, 
            };


        case Actions.CHANGECOLORSHADEID:
            return {
                ...state,
                colors: action.payload, 
            };

        default:
            return state;
    }
};


const store = configureStore({
    reducer:reducer
});


export default store;