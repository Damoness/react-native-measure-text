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

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

/**
 * 计算高度
 * @param options
 * @returns
 */
export async function height(options: {
  text: string;
  width: number;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
}): Promise<number> {
  const { text, ...others } = options;
  const result = await heights({ texts: [text], ...others });
  return result.length > 0 ? result[0] : Promise.reject('error');
}

/**
 * 计算宽度
 * @param options
 * @returns
 */
export async function width(options: {
  text: string;
  height: number;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
}): Promise<number> {
  const { text, ...others } = options;
  const result = await widths({ texts: [text], ...others });
  return result.length > 0 ? result[0] : Promise.reject('error');
}

/**
 * 同时计算多个高度
 * @param options
 * @returns
 */
export function heights(options: {
  texts: string[];
  width: number;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
}): Promise<number[]> {
  return ReactNativeMeasureText.heights(options);
}

/**
 * 同时计算多个宽度
 * @param options
 * @returns
 */
export function widths(options: {
  texts: string[];
  height: number;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
}): Promise<number[]> {
  return ReactNativeMeasureText.widths(options);
}
