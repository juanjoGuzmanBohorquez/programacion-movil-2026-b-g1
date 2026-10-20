# CP3 — Session list states

## Implementation

The teacher session list includes:
- Loading skeletons during a simulated 1.5-second delay.
- An error message with a Retry action.
- An empty state with an action to view example sessions.
- Pull-to-refresh connected to the simulated loading cycle.

This prototype uses local example data, without backend requests.

## Reproducing the states

- `/sesiones`: loading followed by the example sessions.
- `/sesiones?estado=error`: simulated error; Retry recovers the list.
- `/sesiones?estado=vacio`: simulated empty list.

## Automated validation

Command: `npm test -- src/app/SessionList.test.tsx`

Result: 1 test passed.
The test verifies loading, error feedback, Retry, and list recovery.
The production build also passed.

## Pending manual validation

Check the pull-to-refresh gesture in the browser.
Capture the loading, error, and empty states in `docs/img/`.
