import { useHeaderHeight } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  View,
  StatusBar,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ViewProps;

const MyKeyboardAvoidingView: React.FC<Props> = ({ children, ...props }) => {
  const height = useHeaderHeight();
  const safe = useSafeAreaInsets();

  const componentRef = useRef<View>(null);
  const [componentTop, setComponentTop] = useState(0);

  const onLayout = () => {
    if (componentRef.current) {
      componentRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setComponentTop(pageY);
      });
    }
  };

  return (
    <View ref={componentRef} onLayout={onLayout} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        //pointerEvents="box-none"
        style={{ flex: 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={componentTop + safe.top + 10}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

export default MyKeyboardAvoidingView;
