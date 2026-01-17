from fastapi import FastAPI, Depends, HTTPException
from auth.authentication import oauth2_scheme, get_current_user, create_access_token
from models.user import User
from data.users import users_db
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if user is None or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/protected")
async def protected_route(username: str = Depends(get_current_user)):
    return {"message": f"Hello, {username}! This is a protected resource."}