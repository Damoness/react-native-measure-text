import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@newbanker/react-native-measure-text' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ReactNativeMeasureText = NativeModules.ReactNativeMeasureText
  ? NativeModules.ReactNativeMeasureText
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ReactNativeMeasureText.multiply(a, b);
}
