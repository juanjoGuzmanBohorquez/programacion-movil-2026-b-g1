import { useCallback, useRef, useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonBackButton,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  type RefresherEventDetail,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useParams } from 'react-router-dom';

import SessionList from './SessionList';
import SessionFormPage from './SessionFormPage';
import { getSessions } from './session-store';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import './theme/variables.css';

function SessionsPage() {
  const [sessions, setSessions] = useState(getSessions);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const pendingRefresh = useRef<RefresherEventDetail | null>(null);

  useIonViewWillEnter(() => {
    setSessions(getSessions());
  });

  const finishRefresh = useCallback(() => {
    pendingRefresh.current?.complete();
    pendingRefresh.current = null;
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Attendance · Profesor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={event => {
            pendingRefresh.current = event.detail;
            setSessions(getSessions());
            setRefreshVersion(value => value + 1);
          }}
        >
          <IonRefresherContent
            pullingText="Desliza para actualizar sesiones"
            refreshingText="Actualizando sesiones…"
          />
        </IonRefresher>

        <main className="workshop-content">
          <h1>Sesiones de clase</h1>
          <p>Selecciona la sesión para consultar su código QR.</p>
          <p>Demostración con datos guardados en este navegador.</p>

          <IonButton routerLink="/sesiones/nueva">
            Crear sesión
          </IonButton>

          <SessionList
            sessions={sessions}
            refreshVersion={refreshVersion}
            onSettled={finishRefresh}
          />
        </main>
      </IonContent>
    </IonPage>
  );
}

function SessionQrPage() {
  const { id } = useParams<{ id: string }>();
  const session = getSessions().find(item => item.id === id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sesiones" text="Sesiones" />
          </IonButtons>
          <IonTitle>QR de la sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <main className="workshop-content">
          <h1>{session?.course ?? 'Sesión no encontrada'}</h1>

          {session ? (
            <>
              <p>
                Sesión {session.id} · {session.date} · {session.time}
              </p>
              <section aria-labelledby="qr-heading">
                <h2 id="qr-heading">Registro de asistencia</h2>
                <p>
                  La generación del QR todavía no está conectada
                  al backend.
                </p>
                <p>Regresa a Sesiones para elegir otra clase.</p>
              </section>
            </>
          ) : (
            <p>Regresa a Sesiones para seleccionar una clase disponible.</p>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route
          exact
          path="/sesiones/nueva"
          component={SessionFormPage}
        />
        <Route exact path="/sesiones" component={SessionsPage} />
        <Route
          exact
          path="/sesiones/:id/qr"
          component={SessionQrPage}
        />
        <Route exact path="/">
          <Redirect to="/sesiones" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;