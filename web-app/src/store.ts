import { configureStore } from '@reduxjs/toolkit';
import {Color, roles} from "@/types";
import { getNewRandomColorData, updateColorData } from './utils';


export type StateType = {
    colors : Color[],
};


const initialState: StateType = {
    colors: [
        getNewRandomColorData(0)
    ],
};


export enum Actions{
    ADDCOLOR = "ADDCOLOR",
    REMOVECOLOR = "REMOVECOLOR",
    CHANGECOLORNAME = "CHANGECOLORNAME",
    UPDATESHADESID = "UPDATESHADESID",
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

        dispatch({
            type: Actions.UPDATECOLOR,
            payload: newColors,
        });
    };
};




export const changeColorName = (name: string, role: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        
        const newColors = state.colors
            .map((el: Color) => {
                if(el.role !== role) return el;

                return { ...el, name }; 
            });

        dispatch({
            type: Actions.CHANGECOLORNAME,
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

        case Actions.CHANGECOLORNAME:
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