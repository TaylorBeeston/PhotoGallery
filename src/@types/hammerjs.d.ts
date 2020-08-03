declare module 'react-hammerjs' {
  import * as React from 'react';

  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  type HammerOptionsWithRecognizers = Omit<HammerOptions, 'recognizers'> & {
    recognizers?: { [gesture: string]: RecognizerOptions };
  };

  declare namespace ReactHammer {
    interface ReactHammerProps {
      direction?:
        | 'DIRECTION_NONE'
        | 'DIRECTION_LEFT'
        | 'DIRECTION_RIGHT'
        | 'DIRECTION_UP'
        | 'DIRECTION_DOWN'
        | 'DIRECTION_HORIZONTAL'
        | 'DIRECTION_VERTICAL'
        | 'DIRECTION_ALL';
      options?: HammerOptionsWithRecognizers;
      recognizeWith?: { [gesture: string]: Recognizer | string };
      vertical?: boolean;
      action?: HammerListener;
      onDoubleTap?: HammerListener;
      onPan?: HammerListener;
      onPanCancel?: HammerListener;
      onPanEnd?: HammerListener;
      onPanStart?: HammerListener;
      onPinch?: HammerListener;
      onPinchCancel?: HammerListener;
      onPinchEnd?: HammerListener;
      onPinchIn?: HammerListener;
      onPinchOut?: HammerListener;
      onPinchStart?: HammerListener;
      onPress?: HammerListener;
      onPressUp?: HammerListener;
      onRotate?: HammerListener;
      onRotateCancel?: HammerListener;
      onRotateEnd?: HammerListener;
      onRotateMove?: HammerListener;
      onRotateStart?: HammerListener;
      onSwipe?: HammerListener;
      onTap?: HammerListener;
      onSwipeLeft?: HammerListener;
      onSwipeRight?: HammerListener;
      onSwipeUp?: HammerListener;
      onSwipeDown?: HammerListener;
    }
  }

  declare const ReactHammer: React.ComponentClass<ReactHammer.ReactHammerProps>;
  export = ReactHammer;
}
