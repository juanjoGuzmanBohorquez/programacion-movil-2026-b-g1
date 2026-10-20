# CP2 — Navegación y tokens de diseño

## Patrón de navegación

Se propone una navegación jerárquica para el profesor:
lista de sesiones → QR de una sesión → regreso a la lista.

El QR depende de la sesión seleccionada, por lo que se presenta
como una pantalla secundaria.

- `/sesiones`: lista de sesiones.
- `/sesiones/:id/qr`: pantalla de QR de la sesión seleccionada.

Los datos de las sesiones son de demostración. La generación
del QR todavía requiere conexión con el backend del equipo.

## Tokens de diseño

Los tokens se definen en `app/src/app/theme/variables.css`.

| Uso | Color | Contraste |
| --- | --- | --- |
| Primario | #166534 | 7.13:1 con blanco |
| Secundario | #334155 | 10.35:1 con blanco |
| Éxito | #166534 | 7.13:1 con blanco |
| Error | #B91C1C | 6.47:1 con blanco |
| Texto sobre fondo | #0F172A sobre #F8FAFC | 17.06:1 |

Estas combinaciones superan 4.5:1 para texto normal.
Los valores corresponden a los pares de colores indicados;
queda pendiente comprobar su aplicación en las pantallas.

La tipografía base utiliza 1rem y los títulos 1.5rem.
Los espacios utilizan 0.5rem, 1rem y 1.5rem.
El contenido tiene un ancho máximo de 48rem.
