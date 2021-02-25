export default interface TimerStateListener {
  onStart?(): void;
  onInterval?(): void;
  onEnd?(): void;
}

export type TimerStateListenerEnum = keyof TimerStateListener;
