import NanoTimer from 'nanotimer';
import TimerStateListener, {
  TimerStateListenerEnum,
} from './timer-state-listener';

export const SECONDS_SUFFIX = 's';

export default class TimeWrapper {
  private timerStateListeners: TimerStateListener[];

  private timer: NanoTimer;

  private totalTimeInSeconds!: string;

  private updateIntervalInSeconds!: string;

  constructor(totalTimeInSeconds: number, updateIntervalInSeconds: number) {
    this.timer = new NanoTimer();
    this.timerStateListeners = [];
    this.setTotalTimeInSeconds(totalTimeInSeconds);
    this.setUpdateIntervalInSeconds(updateIntervalInSeconds);
  }

  private onTimeInterval() {
    this.notifyListeners('onInterval');
  }

  private onTimeEnd() {
    this.notifyListeners('onEnd');
  }

  private notifyListeners(event: TimerStateListenerEnum): void {
    this.timerStateListeners.forEach((listener) => {
      const onEventListener = listener[event];
      if (onEventListener) {
        onEventListener();
      }
    });
  }

  public setUpdateIntervalInSeconds(value: number) {
    this.updateIntervalInSeconds = `${value}${SECONDS_SUFFIX}`;
  }

  public setTotalTimeInSeconds(value: number) {
    this.totalTimeInSeconds = `${value}${SECONDS_SUFFIX}`;
  }

  public start() {
    this.timer.setInterval(
      this.onTimeInterval.bind(this),
      [],
      this.updateIntervalInSeconds,
    );

    this.timer.setTimeout(
      this.onTimeEnd.bind(this),
      [],
      this.totalTimeInSeconds,
      () => this.timer.clearInterval(),
    );

    this.notifyListeners('onStart');
  }

  public end() {
    this.timer.clearInterval();
    this.timer.clearTimeout();

    this.notifyListeners('onEnd');
  }

  public addListener(listener: TimerStateListener): void {
    this.timerStateListeners.push(listener);
  }

  public removeListener(listener: TimerStateListener): void {
    this.timerStateListeners.splice(
      this.timerStateListeners.indexOf(listener),
      1,
    );
  }
}
