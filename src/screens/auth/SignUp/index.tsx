import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthHeader } from "../../../components/headers";
import { Colors, Spacing } from "../../../constant";
import {
  useAdminAuthMutation,
  useFirebasePhoneAuthMutation,
  useSavePhoneSessionInfoMutation,
  useSignupWithFirebasePhoneMutation,
} from "../../../generated/graphql";
import { store, useStoreActions } from "../../../store";
import { PhoneForm } from "./steps/PhoneForm";
import { useEffect, useRef, useState, useTransition } from "react";
import { ConfirmationForm } from "./steps/Confirmation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserForm } from "./steps/UserForm";
import { keys } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../navigation";
import { postOnlineAuthentication } from "../../../helper/auth";
import { useTranslation } from "react-i18next";
import { MyText } from "../../../components/Text";
import { ModalComponent } from "../../../components/modals";
import { InputText } from "../../../components/inputs";

const PHONE_AUTH_SESSION_KEY = "PHONE_AUTH_SESSION_SIGNUP";

const TEST_PHONES = [
  "+393356884031",
  "+393348762090",
  "+393519030626",
  "+393519030620",
];

export const SignUpScreen = () => {
  const firebaseConfirm = useRef<null | any>(null);

  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState<null | string>(null);
  const [firebaseToken, setFirebaseToken] = useState<null | string>(null);

  const { t } = useTranslation();

  // navigazione
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  // snackbar
  const openSnack = useStoreActions((actions) => actions.snackbar.open);
  // graphql
  const [savePhoneSessionInfoMutation] = useSavePhoneSessionInfoMutation();
  const [firebasePhoneAuthMutation] = useFirebasePhoneAuthMutation();
  const [signupWithPhoneMutation] = useSignupWithFirebasePhoneMutation();
  const [adminAuthMutation] = useAdminAuthMutation();

  // Handle login
  async function onAuthStateChanged(user: any) {
    console.log("onAuthStateChanged");
    if (user) {
      console.log("onAuthStateChanged - logged");
      // UTENTE REGISTARTO TRAMITE FIREBASE
      const idTokenResult = {} as any;
      if (idTokenResult?.token) {
        console.log("User JWT: ", idTokenResult?.token);
        // invia il token al server
        const { data } = await firebasePhoneAuthMutation({
          variables: { token: idTokenResult?.token },
        });
        if (data && data.firebasePhoneAuth.success) {
          openSnack({
            message: "Verifica effettuata con successo",
          });

          // LOGIN
          if (
            !data.firebasePhoneAuth.newUser &&
            data.firebasePhoneAuth.tokens
          ) {
            console.log("Success firebase login");
            const { accessToken, refreshToken } = data.firebasePhoneAuth.tokens;
            // Imposta i token di accesso nello store
            store.getActions().auth.singin({ accessToken, refreshToken });
            postOnlineAuthentication();
            // Navigazione
            (navigation.navigate as any)("DiscoverTab");
            // Disconnette da firebase
            //auth().signOut();
            // Resetta il form
            reset();
          } else {
            // REGISTRAZIONE - NUOVO UTENTE
            // Il clinet è registrato con firebase ma non è ancora registrato nel database nostro
            console.log("New user");
            setFirebaseToken(idTokenResult?.token);
            skip(3); // From registrazione
          }
        } else {
          openSnack({
            message: t("signup-screen:error.generic"),
          });

          // auth().signOut();
          return;
        }
      } else {
        //auth().signOut();
        return;
      }
    }
  }

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //return subscriber;
  }, []);

  /**
   * Gestisce l'autenticazione dell'admin
   * @param password
   * @param phoneNumber
   */
  const handleAdminAuth = async () => {
    try {
      if (!phoneNumber || !adminPassword) return;
      const { data } = await adminAuthMutation({
        variables: {
          password: adminPassword,
          phoneNumber,
        },
      });
      if (data?.adminAuth.success) {
        console.log("Admin login success");

        if (!data.adminAuth.tokens) throw new Error();
        const { accessToken, refreshToken } = data.adminAuth.tokens;

        setIsAdminModalOpen(false);
        // Imposta i token di accesso nello store
        store.getActions().auth.singin({ accessToken, refreshToken });
        postOnlineAuthentication();
        // Navigazione
        (navigation.navigate as any)("DiscoverTab");
        // Disconnette da firebase
        //  auth().signOut();
        // Resetta il form
        reset();
      } else throw new Error();
    } catch (err) {
      console.warn(err);
      Alert.alert("Errore", "Impossibilie accedere");
    }
  };

  /**
   * Invia il messaggio di verifica al numero di telefono
   * @param phoneNumber
   */
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      // Controlla se il numero di telefono è tra quelli di test
      if (TEST_PHONES.includes(phoneNumber.replace(/\s/g, ""))) {
        setIsAdminModalOpen(true);
        setPhoneNumber(phoneNumber);
        return;
      }

      // Controlla se il numero di telefono è già associato ad un account
      // const { data } = await isPhoneAlreadyUsed({ variables: { phoneNumber } });
      // if (data?.isPhoneNumberAlreadyUsed) {
      //   console.log("Numero di telefono già associato ad un account");
      //   navigation.replace("SignIn", { phoneNumber });
      //   return;
      // }

      // Controlla se è già in corso una sessione di autenticazione
      // const sessionObj = await AsyncStorage.getItem(
      //   PHONE_AUTH_SESSION_KEY + "u" // @remove
      // );

      // if (
      //   sessionObj &&
      //   JSON.parse(sessionObj)?.sessionId &&
      //   JSON.parse(sessionObj)?.phoneNumber == phoneNumber
      // ) {
      //   const date = JSON.parse(sessionObj)?.date;
      //   console.log("Recupero sessione di autenticazione salvata...", {
      //     phoneNumber,
      //     sessionObj,
      //   });
      //   // controlla se è passato meno di 10 min
      //   if (new Date().getTime() - new Date(date).getTime() < 1000 * 60 * 10) {
      //     setPhoneNumber(phoneNumber); // salva il numero di telefono
      //     setSessionId(JSON.parse(sessionObj).sessionId); // salva l'id della sessione
      //     skip(); // va al prossimo form
      //     return;
      //   }
      // }

      // INVIA IL MESSAGGIO DI VERIFICA
      console.log("Sending sms to: ", phoneNumber);
      // const confirmation = await auth().signInWithPhoneNumber(
      //   phoneNumber,
      //   true
      // );

      // const sessionInfo = confirmation.verificationId;

      //   console.log("sessionInfo: ", sessionInfo);

      // SUCCESSO
      //if (sessionInfo) {
      //firebaseConfirm.current = confirmation;

      // // salva la sessione in meoria locale
      // const sessionObj = {
      //   sessionInfo,
      //   phoneNumber,
      //   date: new Date(),
      //   sessionId,
      // };
      // console.log({ sessionInfo }); // @remove
      // AsyncStorage.setItem(
      //   PHONE_AUTH_SESSION_KEY,
      //   JSON.stringify(sessionObj)
      // );

      // salva il numero di telefono e l'id della sessione
      setPhoneNumber(phoneNumber);
      // prossimo form
      skip();
      // } else throw new Error();
    } catch (error) {
      console.warn(error);
      console.log({ string: String(error) });

      firebaseConfirm.current = null;

      if (String(error).includes("too-many-requests"))
        openSnack({
          message: t("signup-screen:errors.too-many-requests"),
        });
      else if (String(error).includes("format"))
        openSnack({
          message: t("signup-screen:errors.phone-number-not-valid"),
        });
      else openSnack({ message: t("signup-screen:errors.generic") });
    }
  }

  /**
   * Invia al server le informazioni della sessione di autenticazione
   * @param sessionInfo
   * @param phoneNumber
   * @returns Session ID
   */
  const sendSessionInfoToServer = async (
    sessionInfo: string,
    phoneNumber: string
  ) => {
    console.log({ sessionInfo, phoneNumber });
    const { data } = await savePhoneSessionInfoMutation({
      variables: {
        sessionInfo,
        phoneNumber,
      },
    });
    console.log({ data });
    if (data?.savePhoneSessionInfo) return data?.savePhoneSessionInfo;
    else throw new Error();
  };

  /**
   * Verifica il codice di verifica
   * @param code
   * @returns
   */
  const verfyCode = async (code: string) => {
    try {
      if (!firebaseConfirm.current) return;
      await firebaseConfirm.current.confirm(code);
    } catch (err) {
      console.warn(err);
      openSnack({
        message: t("signup-screen:errors.wrong-code"),
      });
    }
  };

  const reset = () => {
    setPhoneNumber(null);
    firebaseConfirm.current = null;
  };

  // SUBMIT REGISTRAZIONE
  const submit = async (username: string) => {
    try {
      console.log("creating user with: ", {
        username,
        phoneNumber,
      });
      if (!firebaseToken) return;
      const { data } = await signupWithPhoneMutation({
        variables: { username, token: firebaseToken },
      });
      if (
        data?.signupWithFirebasePhone.success &&
        data.signupWithFirebasePhone.tokens
      ) {
        // esegue l'accesso dell'utente
        const { accessToken, refreshToken } =
          data.signupWithFirebasePhone.tokens;
        console.log("REGISTRAZIONE CON SUCCESSO!", {
          accessToken,
          refreshToken,
        });
        store.getActions().auth.singin({ accessToken, refreshToken });
        postOnlineAuthentication();
        reset();
        // Disconnetti da firebase
        //  auth().signOut().catch(console.warn);
      } else throw new Error();
    } catch (err) {
      console.warn(err);
      openSnack({
        message: t("signup-screen:errors.generic"),
      });
    }
  };

  const skip = (pageIndex?: number) => {
    if (pageIndex) setPageIndex(pageIndex);
    setPageIndex((p) => p + 1);
  };

  const renderAdminModal = () => {
    return (
      <ModalComponent
        setIsOpen={(setIsOpen) => setIsAdminModalOpen(setIsOpen)}
        isOpen={isAdminModalOpen}
        height={hp(30)}
        style={{ backgroundColor: Colors.lightGrey }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyText dark bold size="title">
            Accesso Admin
          </MyText>
          <View
            style={{
              width: "100%",
              marginTop: hp(2),
            }}
          >
            <InputText
              labelStyle={{ color: Colors.darkGrey }}
              label="Password"
              password
              autoCapitalize="none"
              value={adminPassword}
              onChangeText={setAdminPassword}
            />
            <TouchableOpacity onPress={handleAdminAuth}>
              <MyText
                dark
                bold
                style={{
                  marginTop: hp(0.5),
                  textAlign: "center",
                }}
              >
                Accedi
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
    );
  };

  const renderForm = () => {
    if (pageIndex === 0)
      return (
        <PhoneForm next={skip} signInWithPhoneNumber={signInWithPhoneNumber} />
      );
    else if (pageIndex === 1)
      return (
        <ConfirmationForm verfyCode={verfyCode} phoneNumber={phoneNumber!} />
      );
    else return <UserForm submit={submit} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title={t("signup-screen:title")}
        subtitle={t("signup-screen:subtitle")}
      />
      {renderForm()}
      {renderAdminModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  checkbox: {
    marginRight: widthPercentageToDP(3.5),
    borderColor: Colors.darkGrey,
  },
});
