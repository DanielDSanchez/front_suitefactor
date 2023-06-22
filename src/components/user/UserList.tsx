import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    IonButton, IonCard, IonCardContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent, IonItem, IonList,
    IonText, IonFab, IonFabButton,
    IonFabList, IonIcon
} from '@ionic/react';
import { pencilOutline, closeCircleOutline, add, addOutline } from 'ionicons/icons';
import { eliminarUsuario, buscarUsuarios, buscarCharacter } from './UserApi';
import Usuario from '../../models/Usuario';
import character from '../../models/characters';

const UserList: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [character, setCharacter] = useState<character>({});
    const history = useHistory();

    useEffect(() => {
        usuariosList();
        buscarCha();
    }, [])

    const usuariosList = async () => {
        const response = await buscarUsuarios()
        setUsuarios(response);
    }

    const añadirUsuario = () => {
        history.push('/page/user/new');
    }

    const editarUsuario = (id: string) => {
        history.push("/page/user/" + id);
    }

    const eliminar = async (id: string) => {
        await eliminarUsuario(id);
        usuariosList();
    }

    const buscarCha = async () => {
        const response = await buscarCharacter();
        delete response.origin
        delete response.episode
        delete response.location
        setCharacter(response);
    }

    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Usuarios</IonCardTitle>
                    <IonCardSubtitle>Listado Usuarios</IonCardSubtitle>
                    <IonItem>
                        <IonButton onClick={añadirUsuario} color="primary"
                            fill="solid" slot="end" size="default">
                            <IonIcon icon={add} />
                            Agregar Usuario
                        </IonButton>
                    </IonItem>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {usuarios.map((usuario: Usuario, index) =>
                            <IonCard color={usuario.estado === 1 ? "light" : ""}
                                key={index} style={{ minHeight: "14rem" }}
                                className="ion-align-items-center ">
                                <IonCardHeader>
                                    <IonCardTitle>{usuario.nombre}
                                        <IonContent className="ion-padding">
                                            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                                                <IonFabButton size='small'>
                                                    <IonIcon icon={addOutline}></IonIcon>
                                                </IonFabButton>
                                                <IonFabList side="bottom">
                                                    <IonFabButton onClick={() => editarUsuario(String(usuario.idUsuarios))}>
                                                        <IonIcon icon={pencilOutline}>Editar</IonIcon>
                                                    </IonFabButton>
                                                    <IonFabButton onClick={() => eliminar(String(usuario.idUsuarios))}>
                                                        <IonIcon icon={closeCircleOutline}>Inactivar</IonIcon>
                                                    </IonFabButton>
                                                </IonFabList>
                                            </IonFab>
                                        </IonContent>
                                    </IonCardTitle>
                                    <IonCardSubtitle>{usuario.tipoDocumento} {usuario.documento}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonText>Correo: {usuario.email}</IonText><br />
                                    <IonText>Telefono: {usuario.telefono}</IonText><br />
                                    <IonText>Direccion: {usuario.direccion}</IonText><br />
                                </IonCardContent>
                            </IonCard>
                        )}

                        <IonCard 
                            className="ion-align-items-center ">
                            <IonCardHeader>
                                <IonCardTitle></IonCardTitle>
                                <IonCardSubtitle>{character.name}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText>{character.species}</IonText>
                            </IonCardContent>
                        </IonCard>

                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    );
};

export default UserList;