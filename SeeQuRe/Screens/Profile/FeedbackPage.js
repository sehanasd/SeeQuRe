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

const FeedbackPage = () => {
  const [checked, setChecked] = useState(false);
  const [text, onChangeText] = useState("");
  const scrollViewRef = useRef();

  // const submitFeedback = () => {
  //   console.log("Feedback Submitted:", { rating: checked, comments: text });
  // };

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
                value="opt1"
                status={checked === "opt1" ? "checked" : "unchecked"}
                onPress={() => setChecked("opt1")}
                color="#6FCF97"
              />
              <Text style={styles.radioText}> Excellent </Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton
                value="opt2"
                status={checked === "opt2" ? "checked" : "unchecked"}
                onPress={() => setChecked("opt2")}
                color="#FFD700"
              />
              <Text style={styles.radioText}> Good </Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton
                value="opt3"
                status={checked === "opt3" ? "checked" : "unchecked"}
                onPress={() => setChecked("opt3")}
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
            // onPress={submitFeedback}
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
