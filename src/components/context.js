import { createContext } from "react";

// Only export contexts, do not import any components here.
// Make sure this file does NOT import anything except from 'react'.

export const UserContext = createContext(null);
export const CartContext = createContext(null);

// Do not import any components or use CartContext in this file.
// Only define and export contexts here.
// If you still see the error, check ALL your imports:
// - Always import { CartContext } from '../context' at the TOP of your files, before importing any components that use CartContext.
// - Never import any component (like Header) inside this file.
