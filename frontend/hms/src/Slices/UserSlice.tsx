
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface User {
    role: string;
    name: string;
    id: number;
    email: string;
    sub?: string;
    exp?: number;
    iat?: number;
}

const token = localStorage.getItem("token");

let initialUserState: User | null = null;

if (token) {
    try {
        initialUserState = jwtDecode<User>(token);
    } catch (error) {
        console.error("Invalid JWT token:", error);
        localStorage.removeItem("token");
    }
}

const userSlice = createSlice({
    name: "user",

    initialState: initialUserState,

    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        },

        removeUser: () => {
            return null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

// // 1. Fetch the raw token string
// const token = localStorage.getItem('token');
// let initialUserState = null; // Default to null if not authenticated

// // 2. Only decode if the string has a valid 3-part structure separated by two dots
// if (token && token.split('.').length === 3) {
//     try {
//         initialUserState = jwtDecode(token);
//     } catch (error) {
//         console.error("Corrupted JWT string detected at initialization:", error);
//         localStorage.removeItem('token'); // Clear bad data securely
//     }
// }

// const userSlice = createSlice({
//     name: 'user',
//     initialState: initialUserState || null, // Clean fallback state
//     reducers: {
//         // Added proper types to state and action parameters
//         setUser: (state, action) => {
//             // Note: Make sure action.payload is the raw JWT string when calling setUser
//             localStorage.setItem('token', action.payload);
//             try {
//                 return jwtDecode(action.payload); // Update Redux state with decoded user data
//             } catch {
//                 return null;
//             }
//         },
//         removeUser: (state: any) => {
//             localStorage.removeItem('token');
//             return null; // Reset user state back to null on logout
//         }
//     }
// });

// export const { removeUser, setUser } = userSlice.actions;
// export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

// const userSlice = createSlice({
//     name: 'user',
//     initialState: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '') : {},
//     reducers: {
//         setUser: (state, action) => {
//             localStorage.setItem('token', action.payload);
//             state = action.payload;
//             return state;
//         },
//         removeUser: (state) => {
//             localStorage.removeItem('token');
//             state = {};
//             return state;
//         }
//     }
// })

// export const { removeUser, setUser } = userSlice.actions;
// export default userSlice.reducer;   