import { SignedIn, SignedOut } from "@clerk/nextjs";
import { createContext } from "react";

const AppContext = createContext({ SignedIn, SignedOut });

export default AppContext;
