import Usuario from "../../models/Usuario";
const pathApi = import.meta.env.VITE_BASE_API_URL;

export async function buscarUsuarios() {
    const url = pathApi + "/usuario";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function buscarCharacter() {
    const url = "https://rickandmortyapi.com/api/character/1";
    const response = await fetch(url)
    return await response.json();
}

export async function buscarUsuarioPorId(id: String) {
    const url = `${pathApi}/usuario/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json();
}

export async function guardarUsuario(usuario: Usuario) {
    const url = pathApi + "/usuario";
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function eliminarUsuario(id: String) {
    const url = `${pathApi}/usuario/${id}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
