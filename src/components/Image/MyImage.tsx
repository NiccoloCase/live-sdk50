import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getOptimizedImageUrl } from "../../helper/image";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";
import { Maybe } from "../../generated/graphql";

interface MyImageProps extends FastImageProps {
  width?: number;
  height?: number;
  url?: string;
  blurhash?: string | Maybe<string> | null;
  grayscale?: boolean;
}

const _MyImage: React.FC<MyImageProps> = ({
  width,
  height,
  url,
  blurhash,
  grayscale,
  onLoad: onLoadProp,
  ...other
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const optmiziedUrl = useMemo(() => {
    if (!url) return undefined;

    const options = {
      width,
      height,
      grayscale: grayscale ? true : false,
    };

    return getOptimizedImageUrl(url, options);
  }, [url]);

  const onImageLoad = (e: any) => {
    setImageLoaded(true);
    if (typeof onLoadProp === "function") onLoadProp(e);
  };

  if (!optmiziedUrl) return null;

  return (
    <View
      style={{
        overflow: "hidden",
        position: "relative",
        ...(other.style ? (other.style as any) : {}),
      }}
    >
      <FastImage
        {...other}
        style={[
          other.style,
          {
            backgroundColor: "transparent",
          },
        ]}
        source={{
          uri: optmiziedUrl,
          priority: FastImage.priority.normal,
        }}
        onLoad={onImageLoad}
      />
    </View>
  );
};

export const MyImage = React.memo(
  _MyImage,
  (prev, next) =>
    prev.url === next.url &&
    prev.blurhash === next.blurhash &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.grayscale === next.grayscale
);
