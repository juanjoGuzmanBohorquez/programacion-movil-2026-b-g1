import { useEffect, useState } from 'react';
import {
  IonButton, IonItem, IonLabel, IonList, IonSkeletonText,
} from '@ionic/react';

type Session = {
  id: string;
  course: string;
  date: string;
  time: string;
};

type Props = {
  sessions: Session[];
};

export default function SessionList({ sessions }: Props) {
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const mode = new URLSearchParams(window.location.search).get('estado');

  useEffect(() => {
    setStatus('loading');
    const timer = window.setTimeout(() => {
      setStatus(mode === 'error' && attempt === 0 ? 'error' : 'ready');
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [attempt, mode]);

  if (status === 'loading') {
    return (
      <section role="status" aria-label="Cargando sesiones">
        <p>Cargando sesiones…</p>
        {[1, 2, 3].map(item => (
          <IonSkeletonText
            key={item}
            animated
            style={{ width: '100%', height: '4rem' }}
          />
        ))}
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section role="alert">
        <h2>No pudimos cargar las sesiones</h2>
        <p>Intenta consultar nuevamente la lista de clases.</p>
        <IonButton onClick={() => setAttempt(value => value + 1)}>
          Reintentar
        </IonButton>
      </section>
    );
  }

  if (mode === 'vacio') {
    return (
      <section aria-labelledby="empty-title">
        <h2 id="empty-title">No hay sesiones para mostrar</h2>
        <p>Esta vista simula un curso sin clases registradas.</p>
        <IonButton href="/sesiones">
          Ver sesiones de ejemplo
        </IonButton>
      </section>
    );
  }

  return (
    <IonList aria-label="Sesiones de clase">
      {sessions.map(session => (
        <IonItem
          key={session.id}
          routerLink={`/sesiones/${session.id}/qr`}
          detail
        >
          <IonLabel className="ion-text-wrap">
            <h2>{session.course}</h2>
            <p>{session.date} · {session.time}</p>
            <p>Ver QR de la sesión {session.id}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
