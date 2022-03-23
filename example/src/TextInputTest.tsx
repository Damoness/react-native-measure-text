import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  UIManager,
  findNodeHandle,
} from 'react-native';
import React, { useRef } from 'react';
import TextInputItem from './TextInputItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { content } from './content';
import MeasureText from '@newbanker/react-native-measure-text';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';

const fontSize = 14;
const { height: screenHeight } = Dimensions.get('window');

const TextInputTest = () => {
  const innerKeyboardRef = useRef<any>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={true}
        enableOnAndroid
        enableAutomaticScroll={false}
        innerRef={(ref: any) => (innerKeyboardRef.current = ref)}
        ref={scrollViewRef}
        onKeyboardWillChangeFrame={() => {}}
      >
        <TextInputItem label="日程标题1" placeholder="请输入。。。" />
        <TextInputItem label="日程标题2" placeholder="请输入。。。" />
        <TextInputItem label="日程标题3" placeholder="请输入。。。" />
        <TextInputItem label="日程标题4" placeholder="请输入。。。" />
        <TextInputItem label="日程标题5" placeholder="请输入。。。" />
        <TextInputItem label="日程标题6" placeholder="请输入。。。" />
        <TextInputItem label="日程标题7" placeholder="请输入。。。" />
        <TextInputItem label="日程标题8" placeholder="请输入。。。" />
        <TextInputItem label="日程标题9" placeholder="请输入。。。" />

        <TextInputItem
          label="日程标题10"
          placeholder="请输入。。。"
          multiline
          defaultValue={content}
          style={style.multiTextInputStyle}
          onBlur={() => {}}
          onSelectionChange={async ({ nativeEvent }) => {
            console.log('onSelectionChange', nativeEvent.selection);

            UIManager.measureInWindow(
              findNodeHandle(innerKeyboardRef.current) as number,
              (x1, y1, width1, height1) => {
                console.log('scrollView', x1, y1, height1, width1);

                UIManager.measureInWindow(
                  findNodeHandle(
                    TextInput.State.currentlyFocusedInput()
                  ) as number,
                  async (x, y, width, height) => {
                    console.log('measureInWindow', { x, y, width, height });

                    const h = await MeasureText.height({
                      text: content.slice(
                        0,
                        nativeEvent.selection.start
                      ) /* texts to measure */,
                      width /* container width */,
                      fontSize,
                    });

                    let cursorScreenY = y + h + (StatusBar.currentHeight || 0);

                    let keyboardScreenY =
                      Platform.OS === 'ios'
                        ? screenHeight + (StatusBar.currentHeight || 0) - 336
                        : 506;

                    console.log(
                      '---',
                      h,
                      cursorScreenY,
                      keyboardScreenY,
                      scrollViewRef.current,
                      innerKeyboardRef.current
                    );

                    if (cursorScreenY > keyboardScreenY) {
                      innerKeyboardRef.current.props.scrollForExtraHeightOnAndroid(
                        cursorScreenY - keyboardScreenY + 10
                      );
                    }
                  }
                );
              }
            );
          }}
        />
        <TextInputItem label="日程标题11" placeholder="请输入。。。" />
        <TextInputItem label="日程标题12" placeholder="请输入。。。" />
        <TextInputItem label="日程标题11" placeholder="请输入。。。" />
        <TextInputItem label="日程标题12" placeholder="请输入。。。" />

        <TextInputItem label="日程标题11" placeholder="请输入。。。" />
        <TextInputItem label="日程标题12" placeholder="请输入。。。" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  multiTextInputStyle: {
    fontSize,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    padding: 0,
    textAlignVertical: 'top',
  },
});

export default TextInputTest;
