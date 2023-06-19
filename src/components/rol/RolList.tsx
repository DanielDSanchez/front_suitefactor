import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    IonButton, IonCard, IonCardContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent, IonItem, IonList,
    IonFab, IonFabButton,
    IonFabList, IonIcon
} from '@ionic/react';
import { pencilOutline, closeCircleOutline, add, addOutline } from 'ionicons/icons';
import { eliminarRol, buscarRol } from './RolApi';
import Rol from '../../models/Rol';

const RolList: React.FC = () => {

    const [roles, setRoles] = useState<Rol[]>([]);
    const history = useHistory();

    useEffect(() => {
        rolesList();
    }, [])

    const rolesList = async () => {
        const response = await buscarRol()
        setRoles(response);
    }

    const añadirRol = () => {
        history.push('/page/rol/new');
    }

    const editarRol = (id: string) => {
        history.push("/page/rol/" + id);
    }

    const eliminar = async (id: string) => {
        await eliminarRol(id);
        rolesList();
    }


    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Roles</IonCardTitle>
                    <IonCardSubtitle>Listado Roles</IonCardSubtitle>
                    <IonItem>
                        <IonButton onClick={añadirRol} color="primary"
                            fill="solid" slot="end" size="default">
                            <IonIcon icon={add} />
                            Agregar Rol
                        </IonButton>
                    </IonItem>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {roles.map((rol: Rol, index) =>
                            <IonCard color={rol.estado === 1 ? "light" : ""}
                                key={index} style={{ minHeight: "14rem" }}
                                className="ion-align-items-center ">
                                <IonCardHeader>
                                    <IonCardTitle>{rol.rolTipo}
                                        <IonContent className="ion-padding">
                                            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                                                <IonFabButton size='small'>
                                                    <IonIcon icon={addOutline}></IonIcon>
                                                </IonFabButton>
                                                <IonFabList side="bottom">
                                                    <IonFabButton onClick={() => editarRol(String(rol.idRol))}>
                                                        <IonIcon icon={pencilOutline}>Editar</IonIcon>
                                                    </IonFabButton>
                                                    <IonFabButton onClick={() => eliminar(String(rol.idRol))}>
                                                        <IonIcon icon={closeCircleOutline}>Inactivar</IonIcon>
                                                    </IonFabButton>
                                                </IonFabList>
                                            </IonFab>
                                        </IonContent>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        )}
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    );
};

export default RolList;