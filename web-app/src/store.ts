import { configureStore } from '@reduxjs/toolkit';
import {Color} from "@/types";
import { getNewRandomColorData, getRandomColor, getShadeIdOfColor} from './utils';
/**
 * ! I need to rewrite this
 */

export type StateType = {
    colors : Color[],
    // shadcnColors : Color[],
    // isShadcnTheme : boolean,
};

const hex = getRandomColor()
const shadeId = getShadeIdOfColor(hex)

const initialState: StateType = {
    colors: [
        getNewRandomColorData(0)
    ],
    // shadcnColors: [],
    // isShadcnTheme: false,
};


export enum Actions{
    ADDCOLOR = "ADDCOLOR",
    UPDATENAME = "UPDATENAME",
    UPDATESHADESID = "UPDATESHADESID",
    UPDATEROLE = "UPDATEROLE",
    UPDATECOLOR = "UPDATECOLOR",
}



// add new random color to the colors list
export const addColor = () => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        dispatch({
            type: Actions.ADDCOLOR,
            payload: getNewRandomColorData(state.colors.length),
        });
    }
};


const reducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case Actions.ADDCOLOR:
            return {
                ...state,
                colors: [...state.colors, action.payload], 
            };

        default:
            return state;
    }
};


const store = configureStore({
    reducer:reducer
});


export default store;