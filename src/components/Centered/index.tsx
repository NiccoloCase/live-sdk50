import React, { JSXElementConstructor, ReactElement } from "react";
import {
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type Props = ViewProps & {
  refreshControl?:
    | ReactElement<RefreshControlProps, string | JSXElementConstructor<any>>
    | undefined;
};

export const Centered: React.FC<Props> = ({
  children,
  style,
  refreshControl,
  ...props
}) => {
  if (refreshControl)
    return (
      <ScrollView
        style={[
          {
            flex: 1,
          },
          style,
        ]}
        refreshControl={refreshControl}
        {...props}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </ScrollView>
    );

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
