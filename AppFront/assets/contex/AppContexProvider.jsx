import { createContext } from "react";
import { useState } from "react";

const RegistroVehiculoContex = createContext();

const AppContexProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    return (
        <RegistroVehiculoContex.Provider
            value={{
                user, setUser,
                admin, setAdmin
            }}
        >
            {children}
        </RegistroVehiculoContex.Provider>
    )
}
export {
    AppContexProvider
}
export default RegistroVehiculoContex;