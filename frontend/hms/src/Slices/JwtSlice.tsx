import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: 'jwt',
    initialState: localStorage.getItem('token') || '',
    reducers: {
        // Explicitly typed state as a string, and action with a string payload
        setJwt: (state: string, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload);
            return action.payload; // returning the new string updates the Redux state safely
        },
        // Added the explicit : string type to the state parameter here
        removeJwt: (state: string) => {
            localStorage.removeItem('token');
            return ''; // returning an empty string clears your Redux token state safely
        }
    }
});

export const { setJwt, removeJwt } = jwtSlice.actions;
export default jwtSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const jwtSlice = createSlice({
//     name: 'jwt',
//     initialState: localStorage.getItem('token') || '',
//     reducers: {
//         // setJwt: (state, action) => {
//         //     localStorage.setItem('token', action.payload);
//         //     state = action.payload;
//         //     return state;
//         // },
//         // Explicitly typed state as a string, and action with a string payload
//         setJwt: (state: string, action: PayloadAction<string>) => {
//             localStorage.setItem('token', action.payload);
//             state = action.payload;
//             return state;
//         },
//         removeJwt: (state) => {
//             localStorage.removeItem('token');
//             state = '';
//             return state;
//         }
//     }
// })

// export const { setJwt, removeJwt } = jwtSlice.actions;
// export default jwtSlice.reducer;