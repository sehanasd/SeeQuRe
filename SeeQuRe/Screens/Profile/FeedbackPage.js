import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useAtom } from "jotai";
import { userDocIdAtom } from '../userAtom';
import { firebase } from "../../components/firebaseConfig";

const FeedbackPage = () => {
  const [checked, setChecked] = useState(false);
  const [text, onChangeText] = useState("");
  const scrollViewRef = useRef();
  const [userDocId] = useAtom(userDocIdAtom);

  const submitFeedback = async() => {
    try{
        const collectionRef = firebase.firestore().collection('users');
        const documentRef = collectionRef.doc(userDocId);
        const docSnapshot = await documentRef.get();
        const existingData = docSnapshot.data();
        let updatedFBs;
        if (existingData && existingData.feedbacks) {
     
        updatedFBs = {
       ...existingData.feedbacks, 
       [text]: checked 
     };
   } else {
     
    updatedFBs = {
      [text]: checked 
     };
   }
   await documentRef.set({
    ...existingData, 
    feedbacks: updatedFBs 
  });
  console.log("Feedback Submitted:", { rating: checked, comments: text });
  
    }catch (error){
      console.error("Error sending feedback :", error);
    }
    
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Feedback</Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Share your thoughts! Your feedback helps us improve for a better
              experience
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              How did you feel about the service?
            </Text>
            <View style={styles.radioContainer}>
              <RadioButton
                value="excellent"
                status={checked === "excellent" ? "checked" : "unchecked"}
                onPress={() => setChecked("excellent")}
                color="#6FCF97"
              />
              <Text style={styles.radioText}> Excellent </Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton
                value="good"
                status={checked === "good" ? "checked" : "unchecked"}
                onPress={() => setChecked("good")}
                color="#FFD700"
              />
              <Text style={styles.radioText}> Good </Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton
                value="average"
                status={checked === "average" ? "checked" : "unchecked"}
                onPress={() => setChecked("average")}
                color="#FF9F6F"
              />
              <Text style={styles.radioText}> Average </Text>
            </View>
          </View>
          <View style={styles.commentSection}>
            <Text style={{ marginTop: 10, fontSize: 16 }}>
              Additional Comment
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Share your feedback, comments, and suggestions here..."
                onChangeText={(newText) => onChangeText(newText)}
                value={text}
                onFocus={() =>
                  scrollViewRef.current.scrollTo({ y: 200, animated: true })
                }
              />
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {" "}
                ٠ Characters 1000
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitFeedback}
          >
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackPage;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },

  headerText: {
    fontSize: 32,
  },

  questionContainer: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  radioText: {
    fontSize: 14,
    marginLeft: 8,
  },

  questionText: {
    fontSize: 16,
    marginBottom: 15,
  },

  commentSection: {
    marginBottom: 10,
  },

  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
  },

  input: {
    height: 100,
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "#333",
  },

  submitButton: {
    backgroundColor: "#2f90d8",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
