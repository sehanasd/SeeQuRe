import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import your avatar images
import avatar1 from "../../assets/Avatars/avatar 1.png";
import avatar2 from "../../assets/Avatars/avatar 2.jpeg";
import avatar3 from "../../assets/Avatars/avatar 3.jpeg";
import avatar4 from "../../assets/Avatars/avatar 4.jpeg";
import avatar5 from "../../assets/Avatars/avatar 5.jpeg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
const avatarSize = 150; 
const avatarBorderRadius = 90; 
const avatarOptionSize = 60; 

export function ProfilePage() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(avatars[0]); 
  const [modalVisible, setModalVisible] = useState(false);

  const changeAvatar = (newAvatar) => {
    setAvatar(newAvatar);
    setModalVisible(false);
  };

  const avatarContainerWidth = avatars.length * (avatarOptionSize + 20); 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={avatar} style={styles.avatar} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView horizontal={true}>
            <View
              style={[styles.avatarContainer, { width: avatarContainerWidth }]}
            >
              {avatars.map((avatarOption, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => changeAvatar(avatarOption)}
                >
                  <Image
                    source={avatarOption}
                    style={[
                      styles.avatarOption,
                      { width: avatarOptionSize, height: avatarOptionSize },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("changeUsername")}
            title="Change Username"
            color="#2f90d8"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("changePassword")}
            title="Change Password"
            color="#2f90d8"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("feedback")}
            title="Feedback"
            color="#2f90d8"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("login")}
            title="Logout"
            color="#2f90d8"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarBorderRadius,
    borderColor: "black", 
    borderWidth: 2, 
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  avatarContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)", 
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -380,
    marginBottom: -10,
  },
  avatarOption: {
    borderRadius: avatarOptionSize / 2,
    marginHorizontal: 5,
  },
  buttonWrapper: {
    marginTop: 50,
    width: 250,
  },

  buttonContainer: {
    marginBottom: 20,
  },
});
