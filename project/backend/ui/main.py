import streamlit as st
import requests


API_URL = "http://127.0.0.1:8000"

st.set_page_config(page_title="Task Manager", layout="centered")

# ---- Session state ----
if "token" not in st.session_state:
    st.session_state.token = None
if "username" not in st.session_state:
    st.session_state.username = None

# ---- Login Page ----
def login_page():
    st.title("Login")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Call protected API"):
        headers = {
            "Authorization": f"Bearer {st.session_state.token}"
        }
        r = requests.get(f"{API_URL}/protected", headers=headers)
        st.json(r.json())

    if st.button("Login"):
        response = requests.post(
            f"{API_URL}/token",
            data={
                "username": username,
                "password": password
            }
        )

        if response.status_code != 200:
            st.error("Invalid username or password")
            return

        data = response.json()
        st.session_state.token = data["access_token"]
        st.session_state.username = username
        st.success("Login successful!")
        st.rerun()

# ---- Dashboard ----
def dashboard():
    st.title("Dashboard")
    st.write(f"Welcome, **{st.session_state.username}**")

    if st.button("Call protected API"):
        headers = {
            "Authorization": f"Bearer {st.session_state.token}"
        }
        r = requests.get(f"{API_URL}/protected", headers=headers)
        st.json(r.json())

    if st.button("Logout"):
        requests.post(
            f"{API_URL}/logout",
            headers={
                "Authorization": f"Bearer {st.session_state.token}"
            }
        )

        st.session_state.clear()
        st.rerun()


# ---- Router ----
if st.session_state.token is None:
    login_page()
else:
    dashboard()
