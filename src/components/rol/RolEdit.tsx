import {
    IonButton, IonCard, IonCardContent, IonCardHeader, 
    IonCol, IonContent, IonIcon, IonInput, IonItem,
    IonRow, IonTitle, IonToggle,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Rol from '../../models/Rol';
import { buscarRolPorId, eliminarRol, guardarRol } from './RolApi';
import { Link } from 'react-router-dom';

const RolEdit: React.FC = () => {

    const { id } = useParams<{ id: string; }>();
    const [rol, setRol] = useState<Rol>({});
    const history = useHistory();

    useEffect(() => {
        buscar()
    }, [id]);

    const buscar = async () => {
        if (id === 'new') {
            setRol({});
        } else {
            const rols = await buscarRolPorId(id)
            setRol(rols)
        }
    }

    const save = async () => {
        await guardarRol(rol)
        history.push('/page/roles');
    }

    const switchEstadoRol = (event: any) => {
        const element = event.target;
        rol.estado = element.checked
            ? parseInt(element.value)
            : element.value === "1" ? 0 : 1;
    };

    const eliminar = async () => {
        await eliminarRol(String(rol.idRol))
        history.push('/page/roles');
    }


    return (

        <>
            <IonContent>
                <IonCard >
                    <IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <Link to={"/page/roles"}>
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
                                        <IonInput label='Nombre rol' labelPlacement='floating'
                                            aria-label="Nombre"
                                            onIonChange={e => rol.rolTipo = String(e.detail.value)}
                                            value={rol.rolTipo}> </IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeMd='2' size='12'>
                                    <IonItem>
                                        <IonToggle value={rol.estado === 1 ? "0" : "1"}
                                            onIonChange={switchEstadoRol}>
                                            {rol.estado === 1 ? "Inactivar" : "Activar"}
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
                                            rol.idRol ? (
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
            </IonContent>
        </>
    )
}

export default RolEdit;