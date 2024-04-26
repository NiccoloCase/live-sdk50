import React, { useEffect, useMemo } from "react";
import {
  Image,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../constant";
import { LinearGradient } from "expo-linear-gradient";
import { validationConfig } from "../../config";
import chroma from "chroma-js";
import { Feather } from "@expo/vector-icons";
import { MyImage, MyDeliveryH } from "../Image";
import { Maybe } from "../../generated/graphql";
import { MyText } from "../Text";
import Animated, { FadeIn } from "react-native-reanimated";
import { ModalComponent } from "../modals";
import { RadarSpinner } from "../Spinner/RadarSpinner";
import { PulseSpinner } from "../Spinner/PulseSpinner";
import { useField } from "formik";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ProfilePictureProps {
  loading?: boolean;
  url?: string | null;
  style?: StyleProp<ViewStyle>;
  height: number;
  blurhash?: string | null | Maybe<string>;
  isLive?: boolean;
}

const LIVE_TAG_HEIGHT = heightPercentageToDP(2.5);
const LIVE_TAG_WIDTH = heightPercentageToDP(4);

const calcolateImageHeight = (cardHeight: number) => {
  // In base all'altezza della card, calcolo l'altezza dell'immagine
  // (per facilitare la cache)
  // divido le possibili altezze
  if (cardHeight < 500) return MyDeliveryH.profilePicture.small;
  if (cardHeight >= 500) return MyDeliveryH.profilePicture.big;
};

const NotMemoProfilePicture: React.FC<ProfilePictureProps> = ({
  url,
  loading,
  style,
  height,
  blurhash,
  isLive,
}) => {
  const [isLiveModalOpen, setIsLiveModalOpen] = React.useState(false);
  const borderRadius = height < 300 ? height / 7 : 20;

  const noPicture = !loading && !url;

  useEffect(() => {
    return () => {
      setIsLiveModalOpen(false);
    };
  }, []);

  const renderLiveComponent = () => {
    if (!isLive) return null;
    return (
      <ModalComponent
        height={hp(50)}
        isOpen={isLiveModalOpen}
        setIsOpen={setIsLiveModalOpen}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
            alignSelf: "center",
          }}
        >
          <PulseSpinner big size={heightPercentageToDP(17)} />
          <MyText
            size="title"
            bold
            style={{
              marginBottom: heightPercentageToDP(3),
              marginTop: heightPercentageToDP(1),
            }}
          >
            LIVE!
          </MyText>
          <MyText bold mediumEmphasis>
            Hai veramente incontrato questa persona
          </MyText>
          <MyText
            light
            mediumEmphasis
            style={{ marginTop: heightPercentageToDP(2) }}
          >
            Le persone
            <MyText bold color={Colors.secondary}>
              {" "}
              LIVE{" "}
            </MyText>
            sono quelle con sui sei venuto in contatto con il Radar. Espandi la
            tua cerchia di conoscenze e sblocca tutta la tua città!
          </MyText>
        </View>
      </ModalComponent>
    );
  };

  const renderImageContent = () => {
    if (!loading && url)
      return (
        <MyImage
          url={url}
          height={calcolateImageHeight(height)}
          blurhash={blurhash}
          style={styles.picture}
        />
      );
    else if (noPicture)
      return (
        <LinearGradient
          colors={[
            chroma(Colors.backgroundLight).alpha(0.9).hex(),
            chroma(Colors.backgroundLight).alpha(0.1).hex(),
          ]}
          style={[
            styles.picture,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Feather name="user" size={height / 7} color={Colors.darkGrey} />
        </LinearGradient>
      );
    else return null;
  };

  const renderTag = () => {
    if (!isLive) return null;
    return (
      <AnimatedTouchable
        entering={FadeIn}
        style={styles.liveTag}
        onPress={() => setIsLiveModalOpen(true)}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.primary, Colors.secondary]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MyText size="extraSmall" bold>
            LIVE
          </MyText>
        </LinearGradient>
      </AnimatedTouchable>
    );
  };

  const renderImage = () => (
    <>
      <View>
        <View
          style={[
            styles.pictureWrapper,
            {
              height: height,
              borderRadius,
              overflow: "hidden",
            },
            noPicture && {
              borderWidth: 3,
              borderColor: Colors.backgroundLightBright,
            },
            style,
          ]}
        >
          {renderImageContent()}
        </View>
        {renderTag()}
      </View>
      {renderLiveComponent()}
    </>
  );

  return renderImage();
};

export const ProfilePicture = React.memo(
  NotMemoProfilePicture,
  (prevProps, nextProps) => {
    if (prevProps.url !== nextProps.url) return false;
    if (prevProps.loading !== nextProps.loading) return false;
    if (prevProps.height !== nextProps.height) return false;
    if (prevProps.isLive !== nextProps.isLive) return false;
    return true;
  }
);

const styles = StyleSheet.create({
  pictureWrapper: {
    overflow: "hidden",
    backgroundColor: Colors.backgroundLight,
    aspectRatio: validationConfig.media.profilePicture.aspectRatio,
  },
  picture: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  liveTag: {
    width: LIVE_TAG_WIDTH,
    height: LIVE_TAG_HEIGHT,
    overflow: "hidden",
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 10,
    position: "absolute",
    top: -LIVE_TAG_HEIGHT * 0.2,
    left: 0,
    zIndex: 100,
    borderWidth: 0.4,
    borderColor: Colors.whiteSmoke,
  },
});
