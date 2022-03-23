import * as React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { heights } from '@newbanker/react-native-measure-text';

const TEXT = `package com.newbankerreactnativemeasuretext;
import com.facebook.react.module.annotations.ReactModule;
import androidx.annotation.NonNull;

import android.os.Build;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.content.res.AssetManager;
import java.lang.Math;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import com.facebook.react.views.text.ReactFontManager;

@ReactModule(name = ReactNativeMeasureTextModule.NAME)
public class ReactNativeMeasureTextModule extends ReactContextBaseJavaModule {
    public static final String NAME = "ReactNativeMeasureText";

    private final ReactApplicationContext reactContext;
    private int textBreakStrategy = (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) ? 0 : Layout.BREAK_STRATEGY_HIGH_QUALITY;

    public ReactNativeMeasureTextModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void heights(ReadableMap options, Promise promise) {
    int width = Math.round((float)options.getDouble("width"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");
    String fontFamily = options.getString("fontFamily");
    String fontWeight = options.getString("fontWeight");

    TextPaint paint = createTextPaint(fontSize, fontFamily, fontWeight);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      float spacingMultiplier = 1;
      float spacingAddition = 0;
      boolean includePadding = false;
      Layout layout;
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
        layout = new StaticLayout(
          text,
          paint,
          width,
          Layout.Alignment.ALIGN_NORMAL,
          1.f,
          0.f,
          includePadding
        );
      } else {
        layout = StaticLayout.Builder.obtain(text, 0, text.length(), paint, width)
          .setAlignment(Layout.Alignment.ALIGN_NORMAL)
          .setLineSpacing(0.f, 1.f)
          .setIncludePad(includePadding)
          .setBreakStrategy(textBreakStrategy)
          .setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL)
          .build();
      }
      results.pushDouble(layout.getHeight());
    }

    promise.resolve(results);
  }

  @ReactMethod
  public void widths(ReadableMap options, Promise promise) {
    int height = Math.round((float)options.getDouble("height"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");
    String fontFamily = options.getString("fontFamily");
    String fontWeight = options.getString("fontWeight");

    TextPaint paint = createTextPaint(fontSize, fontFamily, fontWeight);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      results.pushDouble(paint.measureText(text));
    }
    promise.resolve(results);
  }

  private TextPaint createTextPaint(float fontSize, String fontFamily, String fontWeight) {
    TextPaint paint = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
    paint.setTextSize(fontSize * this.reactContext.getResources().getConfiguration().fontScale);
    AssetManager assetManager = getReactApplicationContext().getAssets();
    Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, getFontWeight(fontWeight), assetManager);
    paint.setTypeface(typeface);
    return paint;
  }

  /**
   * Android P is adding new typefaces. This should be updated by that time.
   */
  private int getFontWeight(String fontWeight) {
    if ((fontWeight == null)) return Typeface.NORMAL;
    switch (fontWeight) {
      case "bold":
      case "500":
      case "600":
      case "700":
      case "800":
      case "900":
        return Typeface.BOLD;
      case "normal":
      case "100":
      case "200":
      case "300":
      case "400":
      default:
        return Typeface.NORMAL;
    }
  }



}

`.slice(0, 8000);

const fontSize = 14;
const width = 200;

export default function MeasureTextTest() {
  const [result, setResult] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();

  React.useEffect(() => {
    heights({ texts: [TEXT], width, fontSize }).then((hs) => setResult(hs[0]));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text>{`MeasureText高度: ${result}`}</Text>
        <Text>{`Height:                   ${height}`}</Text>
        <TextInput
          value={TEXT}
          multiline
          scrollEnabled
          style={styles.textInput}
          onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    padding: 0,
    textAlignVertical: 'top',
    backgroundColor: 'gray',

    fontSize: fontSize,
    width: width,
  },
});
