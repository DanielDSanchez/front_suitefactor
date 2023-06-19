import Rol from "./Rol";
import Usuario from "./Usuario";

export default interface UsuarioRol {
    idUsuarioRol?: number;
    rol?: Rol;
    usuario?: Usuario;
    estado?:number;
}