import {
    IonButton, IonCard, IonCardContent, IonCardHeader,
    IonCol, IonContent, IonIcon, IonInput, IonItem,
    IonRow, IonSelect, IonSelectOption, IonTitle, IonToggle,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { buscarUsuarioRolPorId, eliminarUsuarioRol, guardarUsuarioRol } from './UsuarioRolApi';
import { buscarUsuarios } from '../user/UserApi';
import { buscarRol } from '../rol/RolApi';
import { Link } from 'react-router-dom';
import UsuarioRol from '../../models/usuariorol';
import Rol from '../../models/Rol';
import Usuario from '../../models/Usuario';

const UsuarioRolEdit: React.FC = () => {

    const { id } = useParams<{ id: string; }>();
    const [usuarioRol, setUsuarioRol] = useState<UsuarioRol>({});
    const [roles, setRoles] = useState<Rol[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const history = useHistory();

    useEffect(() => {
        buscar();
        rolesList();
        usuariosList();
    }, [id]);

    const buscar = async () => {
        if (id === 'new') {
            setUsuarioRol({});
        } else {
            const usuarioRols = await buscarUsuarioRolPorId(id)
            setUsuarioRol(usuarioRols)
        }
    }

    const rolesList = async () => {
        const response = await buscarRol()
        setRoles(response);
    }

    const usuariosList = async () => {
        const response = await buscarUsuarios()
        setUsuarios(response);
    }

    const save = async () => {
        if (usuarioRol.rol && usuarioRol.usuario) {
            await guardarUsuarioRol(usuarioRol)
            history.push('/page/usuarioroles');
        }
    }

    const switchEstadoRol = (event: any) => {
        const element = event.target;
        usuarioRol.estado = element.checked
            ? parseInt(element.value)
            : element.value === "1" ? 0 : 1;
    };

    const eliminar = async () => {
        await eliminarUsuarioRol(String(usuarioRol.idUsuarioRol))
        history.push('/page/usuarioroles');
    }


    return (

        <>
            <IonContent>
                <IonCard >
                    <IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <Link to={"/page/usuarioroles"}>
                                        <IonButton>Regresar</IonButton>
                                    </Link>
                                    <IonTitle>
                                        {id === 'new'
                                            ? 'Agregar Rol'
                                            : 'Editar Rol'
                                        }
                                    </IonTitle>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonCardHeader>
                    <IonCardContent>
                        <form>
                            <IonRow>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonSelect label="Tipo Rol" labelPlacement="floating"
                                            onIonChange={e => {
                                                if (usuarioRol.rol) {
                                                    usuarioRol.rol.idRol = e.detail.value
                                                } else {
                                                    usuarioRol.rol = {
                                                        idRol: e.detail.value
                                                    }
                                                }
                                            }}
                                            value={usuarioRol.rol?.idRol} aria-label="Tipo Rol"
                                            interface="popover" placeholder="Seleccione uno">
                                            {roles.map((rol, index) =>
                                                <IonSelectOption key={index} value={rol.idRol}>
                                                    {rol.rolTipo}
                                                </IonSelectOption>)}
                                        </IonSelect>

                                        <IonSelect label="Usuario" labelPlacement="floating"
                                            disabled={usuarioRol.idUsuarioRol ? true : false}
                                            onIonChange={e => {
                                                if (usuarioRol.usuario) {
                                                    usuarioRol.usuario.idUsuarios = e.detail.value;
                                                } else {
                                                    usuarioRol.usuario = {
                                                        idUsuarios: e.detail.value
                                                    }
                                                }
                                            }}
                                            value={usuarioRol.usuario?.idUsuarios} aria-label="Usuario"
                                            interface="popover" placeholder="Seleccione uno">
                                            {usuarios.map((usuario: Usuario, index) =>
                                                <IonSelectOption key={index} value={usuario.idUsuarios}>
                                                    {usuario.nombre}
                                                </IonSelectOption>)}
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='2' size='12'>
                                    <IonItem>
                                        <IonToggle value={usuarioRol.estado === 1 ? "0" : "1"}
                                            onIonChange={switchEstadoRol}>
                                            {usuarioRol.estado === 1 ? "Inactivar" : "Activar"}
                                        </IonToggle>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className='ion-justify-content-end'>
                                <IonCol className='ion-no-padding ion-no-margin' sizeMd='2' size='12'>
                                    <IonItem>
                                        <IonButton onClick={() => save()}
                                            color="primary"
                                            fill="solid" slot="end" size="default">
                                            <IonIcon icon={checkmark} />
                                            Guardar
                                        </IonButton>
                                    </IonItem>
                                </IonCol>
                                <IonCol size='12' sizeMd='2' className='ion-no-padding ion-no-margin'>
                                    <IonItem>
                                        {
                                            usuarioRol.idUsuarioRol ? (
                                                <IonButton onClick={() => eliminar()}
                                                    color="danger" fill="solid"
                                                    slot="end" size="default">
                                                    <IonIcon icon={checkmark} />
                                                    Eliminar
                                                </IonButton>
                                            ) : null
                                        }
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent >
        </>
    )
}

export default UsuarioRolEdit;