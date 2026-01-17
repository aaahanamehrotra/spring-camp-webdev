import streamlit as st
import requests
API_URL = "http://127.0.0.1:8000"
def signup_page():
    st.title("Sign Up")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    confirm_password = st.text_input("Confirm Password", type="password")

    if st.button("Create Account"):
        if password != confirm_password:
            st.error("Passwords do not match")
            return

        response = requests.post(
            f"{API_URL}/signup",
            json={
                "username": username,
                "password": password
            }
        )

        if response.status_code != 200:
            st.error(response.json().get("detail", "Signup failed"))
            return

        st.success("Account created! Please log in.")
        st.session_state.page = "login"
        st.rerun()

    if st.button("Back to Login"):
        st.session_state.page = "login"
        st.rerun()
