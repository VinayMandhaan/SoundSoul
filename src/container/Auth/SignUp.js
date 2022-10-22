//---------- imports

// react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";

// third party lib
import CheckBox from "react-native-check-box";

// common navigation
import NavigationService from "../../navigation/NavigationService";
import HeaderLeft from "../../components/HeaderLeft";

// common componets
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";

import { backIcon, show, hide } from "../../constants/Images";

// styles
import AuthStyles from "../../style/AuthStyles";
import SpaceStyles from "../../style/SpaceStyles";
import TextStyles from "../../style/TextStyles";

//---------- component
import {
  signUpUser,
  resetAllAuthForms,
  ResetErrorsState,
  ResetStates,
} from "../../redux/User/user.actions";
import { saveUser, storeUserId } from "../../redux/Local/local.actions";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({ user, localReducer }) => ({
  currentProperty: user.currentProperty,
  propertySignUpSuccess: user.propertySignUpSuccess,
  errors: user.errors,
  isLoggedIn: localReducer.isLoggedIn,
});

function SignUp({ navigation }) {
  //---------- state, veriable and hooks

  // state

  const { currentProperty, propertySignUpSuccess, errors } =
    useSelector(mapState);
  const { isLoggedIn } = useSelector(mapState);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState("");
  const [name, onChangeName] = useState("");
  const [password, onChangepassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const [localErros, setLocalErros] = useState("");
  const [ourIds, setOurIds] = useState(null);
  const [onCheckClick, setOnCheckClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [securePassword1, setSecurePassword1] = useState(true);
  const [securePassword2, setSecurePassword2] = useState(true);

  //---------- life cycle

  //---------- helper: user's actions

  //---------- return main view

  useEffect(() => {
    if (propertySignUpSuccess) {
      dispatch(saveUser());
    }

    if (errors.length > 0) {
      setIsLoading(false);
      setLocalErros(errors);
      dispatch(ResetStates());
      dispatch(ResetErrorsState());
    }
  }, [propertySignUpSuccess, errors]);

  useEffect(() => {
    // dispatch(ResetStates())
    dispatch(ResetErrorsState());
    navigation.navigate("Route");
  }, [isLoggedIn]);
  useEffect(() => {
    console.log("yeesssssss");
    if (ourIds !== null) {
      console.log("yeesssssss");
      dispatch(storeUserId(ourIds, email));
    }
  }, [ourIds]);
  const getApi = async () => {
    try {
      await fetch(
        "http://soundnsoulful.alliedtechnologies.co:8000/v1/api/accounts/users/"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("hahahaha", data);
          setOurIds(data);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    } catch (err) {
      console.log("----------------------", err);
    }
  };

  const handleSignUp = () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setLocalErros("Please check the password...");
      setIsLoading(false);
      return;
    }

    if (
      email !== "" &&
      name !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setLocalErros("");
      dispatch(signUpUser({ email, password, confirmPassword, name }));
    } else {
      setLocalErros("All the fields are required");
      setIsLoading(false);
    }
  };

  return (
    <View style={[AuthStyles.authContainer, { alignItems: "center" }]}>
      <SafeAreaView />
      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 20,
          marginLeft: -30,
        }}
      >
        <HeaderLeft
          text={""}
          iconName={backIcon}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[SpaceStyles.top5, SpaceStyles.padding10, { width: "100%" }]}
      >
        <CustomText
          text={"Sign Up"}
          style={[TextStyles.textBold48Black, { alignSelf: "center" }]}
        />
        <View style={AuthStyles.errorsLogin}>
          <Text style={AuthStyles.errorsLogintxt}>{localErros + errors}</Text>
        </View>
        <View style={[SpaceStyles.vertical2]}>
          {/* <CustomTextInput
              placeholder={"First Name"}
              containerStyle={{
                width: "48%",
              }}
            /> */}

          <View
            style={[
              SpaceStyles.top10,
              AuthStyles.textInputView,
              { width: "100%" },
            ]}
          >
            <TextInput
              style={[{ color: "#000", paddingVertical: 5 }]}
              placeholderTextColor="gray"
              placeholder="Name"
              onChangeText={(text) => {
                setLocalErros("");
                onChangeName(text);
              }}
              value={name}
              textContentType="name"
            />
          </View>
          <View
            style={[
              SpaceStyles.top10,
              AuthStyles.textInputView,
              { width: "100%" },
            ]}
          >
            <TextInput
              style={[{ color: "#000", paddingVertical: 5 }]}
              placeholderTextColor="gray"
              placeholder="Email"
              onChangeText={(text) => {
                setLocalErros("");
                onChangeEmail(text);
              }}
              value={email}
              textContentType="emailAddress"
            />
          </View>
          <View
            style={[
              SpaceStyles.top10,
              AuthStyles.textInputView,
              { width: "100%", flexDirection: "row" },
            ]}
          >
            <TextInput
              style={[{ color: "#000", paddingVertical: 5, width: "95%" }]}
              placeholderTextColor="gray"
              placeholder="Password"
              onChangeText={(text) => {
                setLocalErros("");
                onChangepassword(text);
              }}
              value={password}
              textContentType="password"
              secureTextEntry={securePassword1}
            />

            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                setSecurePassword1(!securePassword1);
              }}
            >
              {securePassword1 ? (
                <Image
                  style={{ height: 20, width: 20, alignSelf: "center" }}
                  source={show}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20, alignSelf: "center" }}
                  source={hide}
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[
              SpaceStyles.top10,
              AuthStyles.textInputView,
              { width: "100%", flexDirection: "row" },
            ]}
          >
            <TextInput
              style={[{ color: "#000", paddingVertical: 5, width: "95%" }]}
              placeholderTextColor="gray"
              placeholder="Confirm Password"
              onChangeText={(text) => {
                setLocalErros("");
                onChangeConfirmPassword(text);
              }}
              value={confirmPassword}
              textContentType="password"
              secureTextEntry={securePassword2}
            />

            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                setSecurePassword2(!securePassword2);
              }}
            >
              {securePassword2 ? (
                <Image
                  style={{ height: 20, width: 20, alignSelf: "center" }}
                  source={show}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20, alignSelf: "center" }}
                  source={hide}
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              AuthStyles.largeButton,
              SpaceStyles.top5,
              { marginBottom: 40 },
            ]}
            onPress={() => {
              handleSignUp(email, name, password, confirmPassword);
              getApi();
            }}
          >
            {isLoading ? (
              <View
                style={{
                  paddingHorizontal: 17,
                }}
              >
                <ActivityIndicator color={"#fff"} />
              </View>
            ) : (
              <CustomText
                text={"Start My Free Trial"}
                style={TextStyles.textSegoe18White}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
}

//---------- export component

export default SignUp;
