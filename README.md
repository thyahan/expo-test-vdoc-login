# Firebase Login Test App

This is a React Native app created for testing API calls to Firebase's login functionality. The purpose is to verify whether the app can run on the TCS laptop emulator without being blocked.

## Repository

[https://github.com/thyahan/expo-test-vdoc-login](https://github.com/thyahan/expo-test-vdoc-login)

## To Get Started

Follow these steps to set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/thyahan/expo-test-vdoc-login
   ```

2. Navigate to the project directory:

   ```bash
   cd expo-test-vdoc-login
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Run the app on an Android emulator:
   ```bash
   npx expo run:android
   ```

## Running the App

Once the app is running on the emulator, press `J` in the terminal to open the debug window.

## Login Test

You can input the provided `username` and `password` on the emulator's login screen to test authentication.

## Expected Results

- **Successful Login**: Returns a `200` status code along with an `accessToken`.
- **Failed Login**: If the password is incorrect or the user account is expired, a `401` status code will be returned with an error message.
