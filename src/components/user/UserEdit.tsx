import {
    IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem,
    IonLabel, IonModal, IonRow, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Usuario from '../../models/Usuario';
import { buscarUsuarioPorId, eliminarUsuario, guardarUsuario } from './UserApi';
import { Link } from 'react-router-dom';


const UserEdit: React.FC = () => {

    const { id } = useParams<{ id: string; }>();
    const [usuario, setUsuario] = useState<Usuario>({});
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        buscar()
    }, [id]);

    const buscar = async () => {
        if (id === 'new') {
            setUsuario({});
        } else {
            const user = await buscarUsuarioPorId(id)
            setUsuario(user)
        }
    }

    const save = async () => {
        await guardarUsuario(usuario)
        history.push('/page/users');
    }

    const switchEstadoUsuario = (event: any) => {
        const element = event.target;
        usuario.estado = element.checked
            ? parseInt(element.value)
            : element.value === "1" ? 0 : 1;
    };

    const eliminar = async () => {
        await eliminarUsuario(String(usuario.idUsuarios))
        history.push('/page/users');
    }

   
    return (

        <>
            <IonContent>
                <IonCard >
                    <IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <Link to={"/page/users"}>
                                        <IonButton>Regresar</IonButton>
                                    </Link>
                                    <IonTitle>
                                        {id === 'new'
                                            ? 'Agregar Usuario'
                                            : 'Editar Usuario'
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
                                        <IonInput label='Nombre' labelPlacement='floating'
                                            aria-label="Nombre"
                                            onIonChange={e => usuario.nombre = String(e.detail.value)}
                                            value={usuario.nombre}> </IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonInput aria-label='Documento' label='Documento'
                                            labelPlacement='floating' onIonChange={e => usuario.documento = String(e.detail.value)}
                                            value={usuario.documento}>
                                        </IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow >
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonSelect label="Tipo Documento" labelPlacement="floating"
                                            onIonChange={e => usuario.tipoDocumento = String(e.detail.value)}
                                            value={usuario.tipoDocumento} aria-label="tipo documento" interface="popover" placeholder="Seleccione uno">
                                            <IonSelectOption value="CC">Cedula Ciudadania</IonSelectOption>
                                            <IonSelectOption value="TI">Tarjeta Identidad</IonSelectOption>
                                            <IonSelectOption value="CE">Cedula Extranjeria</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonInput label='Email' labelPlacement='floating' aria-label="Email"
                                            onIonChange={e => usuario.email = String(e.detail.value)}
                                            value={usuario.email}>
                                        </IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonInput label='Ciudad' labelPlacement='floating' type='text' aria-label="Ciudad"
                                            onIonChange={e => usuario.ciudad = String(e.detail.value)}
                                            value={usuario.ciudad}>
                                        </IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='3' size='12'>
                                    <IonItem>
                                        <IonInput label='Direccion' labelPlacement='floating'
                                            aria-label="Dirección"
                                            onIonChange={e => usuario.direccion = String(e.detail.value)}
                                            value={usuario.direccion}> </IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='3' size='12'>
                                    <IonItem>
                                        <IonInput label='Teléfono' labelPlacement='floating' aria-label='Telefonó' onIonChange={e => usuario.telefono = String(e.detail.value)}
                                            value={usuario.telefono}> </IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonInput label="contrasena" labelPlacement="floating" aria-label=""
                                            onIonChange={e => usuario.contrasena = String(e.detail.value)}
                                            value={usuario.contrasena}> </IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='6' size='12'>
                                    <IonItem>
                                        <IonInput label='Confirme la contraseña'
                                            labelPlacement='floating' aria-label="contrasena"
                                            onIonChange={e => usuario.contrasena = String(e.detail.value)}
                                            value={usuario.contrasena}>
                                        </IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow >
                                <IonCol sizeMd='2' size='12'>
                                    <IonItem>
                                        <IonToggle value={usuario.estado === 1 ? "0" : "1"}
                                            onIonChange={switchEstadoUsuario}>
                                            {usuario.estado === 1 ? "Inactivar" : "Activar"}
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
                                            usuario.idUsuarios ? (
                                                <IonButton  onClick={() => eliminar()}
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
            </IonContent>
        </>
    )
}

export default UserEdit;