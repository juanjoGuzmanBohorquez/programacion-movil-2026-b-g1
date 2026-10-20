import {
  IonApp, IonRouterOutlet, IonPage, IonHeader, IonToolbar,
  IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonButtons, IonBackButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useParams } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import './theme/variables.css';

const sessions = [
  { id: '101', course: 'Programación Móvil', date: '19/10/2026', time: '18:30' },
  { id: '102', course: 'Programación Móvil', date: '26/10/2026', time: '18:30' },
];

function SessionsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Attendance · Profesor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className="workshop-content">
          <h1>Sesiones de clase</h1>
          <p>Selecciona la sesión para consultar su código QR.</p>
          <p>Vista de demostración con sesiones de ejemplo.</p>
          <IonList>
            {sessions.map(session => (
              <IonItem key={session.id} routerLink={`/sesiones/${session.id}/qr`} detail>
                <IonLabel className="ion-text-wrap">
                  <h2>{session.course}</h2>
                  <p>{session.date} · {session.time}</p>
                  <p>Ver QR de la sesión {session.id}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </main>
      </IonContent>
    </IonPage>
  );
}

function SessionQrPage() {
  const { id } = useParams<{ id: string }>();
  const session = sessions.find(item => item.id === id);
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
          {session && (
            <>
              <p>Sesión {session.id} · {session.date} · {session.time}</p>
              <section aria-labelledby="qr-heading">
                <h2 id="qr-heading">Registro de asistencia</h2>
                <p>La generación del QR todavía no está conectada al backend.</p>
                <p>Regresa a Sesiones para elegir otra clase.</p>
              </section>
            </>
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
        <Route exact path="/sesiones" component={SessionsPage} />
        <Route exact path="/sesiones/:id/qr" component={SessionQrPage} />
        <Route exact path="/">
          <Redirect to="/sesiones" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;