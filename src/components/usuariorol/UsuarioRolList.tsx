import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    IonButton, IonCard, IonCardContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent, IonItem, IonList,
    IonFab, IonFabButton,
    IonFabList, IonIcon, IonText
} from '@ionic/react';
import { pencilOutline, closeCircleOutline, add, addOutline } from 'ionicons/icons';
import { eliminarUsuarioRol, buscarUsuarioRol } from './UsuarioRolApi';
import UsuarioRol from '../../models/usuariorol';

const UsuarioRolList: React.FC = () => {

    const [usuarioRoles, setUsuarioRol] = useState<UsuarioRol[]>([]);
    const history = useHistory();

    useEffect(() => {
        usuarioRolList();
    }, [])

    const usuarioRolList = async () => {
        const response = await buscarUsuarioRol()
        setUsuarioRol(response);
    }

    const añadirUsuarioRol = () => {
        history.push('/page/usuariorol/new');
    }

    const editarUsuarioRol = (id: string) => {
        history.push("/page/usuariorol/" + id);
    }

    const eliminar = async (id: string) => {
        await eliminarUsuarioRol(id);
        usuarioRolList();
    }


    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Usuario Rol</IonCardTitle>
                    <IonCardSubtitle>Listado Usuarios Por Roles</IonCardSubtitle>
                    <IonItem>
                        <IonButton onClick={añadirUsuarioRol} color="primary"
                            fill="solid" slot="end" size="default">
                            <IonIcon icon={add} />
                            Agregar UsuarioRol
                        </IonButton>
                    </IonItem>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {usuarioRoles.map((usuarioRol: UsuarioRol, index) =>
                            <IonCard color={usuarioRol.estado === 1 ? "light" : ""}
                                key={index} style={{ minHeight: "14rem" }}
                                className="ion-align-items-center ">
                                <IonCardHeader>
                                    <IonCardTitle>{usuarioRol.rol?.rolTipo}
                                        <IonContent className="ion-padding">
                                            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                                                <IonFabButton size='small'>
                                                    <IonIcon icon={addOutline}></IonIcon>
                                                </IonFabButton>
                                                <IonFabList side="bottom">
                                                    <IonFabButton onClick={() => editarUsuarioRol(String(usuarioRol.idUsuarioRol))}>
                                                        <IonIcon icon={pencilOutline}>Editar</IonIcon>
                                                    </IonFabButton>
                                                    <IonFabButton onClick={() => eliminar(String(usuarioRol.idUsuarioRol))}>
                                                        <IonIcon icon={closeCircleOutline}>Inactivar</IonIcon>
                                                    </IonFabButton>
                                                </IonFabList>
                                            </IonFab>
                                        </IonContent>
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonText>Nombre: {usuarioRol.usuario?.nombre}</IonText><br />
                                    <IonText>Correo: {usuarioRol.usuario?.email}</IonText><br />
                                    <IonText>Telefono: {usuarioRol.usuario?.telefono}</IonText><br />
                                    <IonText>Direccion: {usuarioRol.usuario?.direccion}</IonText><br />
                                </IonCardContent>
                            </IonCard>
                        )}
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    );
};

export default UsuarioRolList;