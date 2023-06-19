import UsuarioRol from "../../models/usuariorol";

const PATHAPI = import.meta.env.VITE_BASE_API_URL;
const DEFAULT_ENDPOINT = "/usuariorol";

export async function buscarUsuarioRol() {
    const url = PATHAPI + DEFAULT_ENDPOINT;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function buscarUsuarioRolPorId(id: String) {
    const url = `${PATHAPI}${DEFAULT_ENDPOINT}/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function guardarUsuarioRol(usuarioRol: UsuarioRol) {
    const url = PATHAPI + DEFAULT_ENDPOINT;
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idUsuarioRol: usuarioRol.idUsuarioRol,
            idRol: usuarioRol.rol?.idRol,
            idUsuarios: usuarioRol.usuario?.idUsuarios,
            estado: usuarioRol.estado
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function eliminarUsuarioRol(id: String) {
    const url = `${PATHAPI}${DEFAULT_ENDPOINT}/${id}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
