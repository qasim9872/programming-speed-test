/* eslint-disable @typescript-eslint/consistent-type-assertions */
import faker from 'faker';
import NanoTimer from 'nanotimer';
import TimeWrapper, { SECONDS_SUFFIX } from './time-wrapper';
import TimerStateListener from './timer-state-listener';

jest.mock('nanotimer');
const MockedNanoTimer = <jest.Mock<NanoTimer>>NanoTimer; // NanoTimer as jest.Mock;

describe('Timer entity', () => {
  const updateIntervalInSeconds: number = 1;
  let totalTimeInSeconds: number;
  let timeWrapper: TimeWrapper;
  let timerStateListener: TimerStateListener;
  let nanoTimerInstance: NanoTimer;

  beforeEach(() => {
    totalTimeInSeconds = faker.random.number({ min: updateIntervalInSeconds });
    timerStateListener = {
      onStart: jest.fn(),
      onInterval: jest.fn(),
      onEnd: jest.fn(),
    };

    nanoTimerInstance = {
      time: jest.fn(),
      hasTimeout: jest.fn(),
      setTimeout: jest.fn(),
      clearTimeout: jest.fn(),
      setInterval: jest.fn(),
      clearInterval: jest.fn(),
    };
    MockedNanoTimer.mockImplementationOnce(() => nanoTimerInstance);

    timeWrapper = new TimeWrapper(totalTimeInSeconds, updateIntervalInSeconds);
  });

  it('should set the initial state of timer correctly', () => {
    expect(timeWrapper['totalTimeInSeconds']).toBe(
      `${totalTimeInSeconds}${SECONDS_SUFFIX}`,
    );
    expect(timeWrapper['updateIntervalInSeconds']).toBe(
      `${updateIntervalInSeconds}${SECONDS_SUFFIX}`,
    );
    expect(timeWrapper['timerStateListeners']).toEqual([]);
  });

  it('should call setTimeout and setInterval functions when start is called', () => {
    timeWrapper.start();

    expect(timeWrapper['timer'].setTimeout).toHaveBeenCalledTimes(1);
    expect(timeWrapper['timer'].setInterval).toHaveBeenCalledTimes(1);
  });

  it('should notify the onStart listener when start timer is started', () => {
    timeWrapper.addListener(timerStateListener);

    timeWrapper.start();

    expect(timerStateListener.onStart).toBeCalled();
    expect(timerStateListener.onInterval).not.toBeCalled();
    expect(timerStateListener.onEnd).not.toBeCalled();
  });

  it('should notify the onInterval listener when the interval time elapses', () => {
    timeWrapper.addListener(timerStateListener);

    timeWrapper.start();

    expect(nanoTimerInstance.setInterval).toBeCalled();
    const mockedSetIntervalFn = nanoTimerInstance.setInterval as jest.Mock;

    const [FirstFunctionCall] = mockedSetIntervalFn.mock.calls;
    const [intervalCallback] = FirstFunctionCall;
    expect(intervalCallback).toBeDefined();
    intervalCallback();

    expect(timerStateListener.onInterval).toBeCalled();
    expect(timerStateListener.onEnd).not.toBeCalled();
  });

  it('should notify the onEnd listener when timer ends', () => {
    timeWrapper.addListener(timerStateListener);

    timeWrapper.start();

    expect(nanoTimerInstance.setTimeout).toBeCalled();
    const mockedSetTimeoutFn = nanoTimerInstance.setTimeout as jest.Mock;

    const [FirstFunctionCall] = mockedSetTimeoutFn.mock.calls;
    const [timeoutCallback] = FirstFunctionCall;
    expect(timeoutCallback).toBeDefined();
    timeoutCallback();

    expect(timerStateListener.onEnd).toBeCalled();
  });

  it('should notify the onEnd listener when end function is called', () => {
    timeWrapper.addListener(timerStateListener);

    timeWrapper.end();

    expect(timerStateListener.onStart).not.toBeCalled();
    expect(timerStateListener.onInterval).not.toBeCalled();
    expect(timerStateListener.onEnd).toBeCalled();
  });
});
