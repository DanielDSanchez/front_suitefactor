import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter} from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import UserList from './components/user/UserList';
import UserEdit from './components/user/UserEdit';
import RolList from './components/rol/RolList';
import RolEdit from './components/rol/RolEdit';
import UsuarioRolList from './components/usuariorol/UsuarioRolList';
import UsuarioRolEdit from './components/usuariorol/UsuarioRolEdit';

setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">

            <Route path="/" exact={true}>
              <Redirect to="/page/users/" />
            </Route>

            <Route path="/page/users/" exact={true}>
              <UserList />
            </Route>

            <Route path="/page/user/:id" exact={true}>
              <UserEdit />
            </Route>

            <Route path="/page/roles/" exact={true}>
              <RolList />
            </Route>

            <Route path="/page/rol/:id" exact={true}>
              <RolEdit />
            </Route>

            <Route path="/page/usuarioroles" exact={true}>
              <UsuarioRolList />
            </Route>

            <Route path="/page/usuariorol/:id" exact={true}>
              <UsuarioRolEdit />
            </Route>

            <Redirect to="/page/users" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
