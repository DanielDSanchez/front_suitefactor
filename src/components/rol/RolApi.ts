import Rol from "../../models/Rol";
const pathApi = import.meta.env.VITE_BASE_API_URL;

export async function buscarRol() {
    const url = pathApi + "/rol";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function buscarRolPorId(id: String) {
    const url = `${pathApi}/rol/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function guardarRol(rol: Rol) {
    const url = pathApi + "/rol";
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(rol),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function eliminarRol(id:String) {
    const url = `${pathApi}/rol/${id}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
