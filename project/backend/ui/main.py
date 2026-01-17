import streamlit as st
import requests
from components.login import login_page 
from components.signup import signup_page

API_URL = "http://127.0.0.1:8000"

st.set_page_config(page_title="Task Manager", layout="centered")
if "page" not in st.session_state:
    st.session_state.page = "login"

# ---- Session state ----
if "token" not in st.session_state:
    st.session_state.token = None
if "username" not in st.session_state:
    st.session_state.username = None




# ---- Dashboard ----
def dashboard():
    st.title("Dashboard")
    st.write(f"Welcome, **{st.session_state.username}**")
    response = requests.get(
            f"{API_URL}/tasks",
            headers={
                "Authorization": f"Bearer {st.session_state.token}"
            }
        )
    tasks = response.json().get("tasks", [])
    st.subheader("Your Tasks")
    if tasks:
        for idx, task in enumerate(tasks, start=1):
            st.write(f"{idx}. {task['task']}")
    else:
        st.write("No tasks found.")
    st.subheader("Create a New Task")
    # st.session_state.task = ""
    task = st.text_input("Task", key="task")
    if st.button("Create Task"):
        if task.strip() == "":
            st.error("Task cannot be empty")
            return
        headers = {
            "Authorization": f"Bearer {st.session_state.token}"
        }
        response = requests.post(
            f"{API_URL}/create_task",
            headers=headers,
            params={"task": task}
        )
        st.success("Task created successfully!")
        task = ""
        st.rerun()


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
    if st.session_state.page == "login":
        login_page()
    else:
        signup_page()
else:
    dashboard()