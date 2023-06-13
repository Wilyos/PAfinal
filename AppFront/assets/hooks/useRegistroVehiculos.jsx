import { useContext } from "react";
import RegistroVehiculoContex from "../contex/AppContexProvider";

const useRegistroVehiculos = () => {

    return useContext(RegistroVehiculoContex);
}

export default useRegistroVehiculos;