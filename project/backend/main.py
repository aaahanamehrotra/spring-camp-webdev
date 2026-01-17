from fastapi import FastAPI, Depends, HTTPException
from auth.authentication import oauth2_scheme, get_current_user, create_access_token, create_refresh_token, logout_user
from models.user import User
from data.users import users_db
from fastapi.security import OAuth2PasswordRequestForm
from utils.password import hash_password, verify_password

app = FastAPI()


from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://aaahanamehrotra7:NjPrQkADqHKpxAuG@cluster0.tzautnp.mongodb.net/?appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["task_manager_db"]
users_collection = db["users"]
tasks_collection = db["tasks"]
projects_collection = db["projects"]
refresh_token_collection = db["refresh_tokens"]


@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    print(hash_password(form_data.password))
    print("haha")
    print("Verifying password for user:", form_data.username)
    print(user)
    if user is None or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400)
    print("Creating tokens for user:", user.username)

    access_token = create_access_token({"sub": user.username})
    print("Access token created:", access_token)
    refresh_token = create_refresh_token({"sub": user.username})
    print("Refresh token created:", refresh_token)

    refresh_token_collection.insert_one({
        "user": user.username,
        "token": refresh_token,
        "revoked": False
    })
    print("Refresh token stored in database for user:", user.username)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }



@app.get("/protected")
async def protected_route(username: str = Depends(get_current_user)):
    return {"message": f"Hello, {username}! This is a protected resource."}

@app.post("/logout")
async def logout(token: str = Depends(oauth2_scheme), username: str = Depends(get_current_user)):
    logout_user(token)

    await refresh_token_collection.update_many(
        {"user": username},
        {"$set": {"revoked": True}}
    )

    return {"message": "Logged out successfully"}