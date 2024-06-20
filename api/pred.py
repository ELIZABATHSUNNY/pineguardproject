from fastapi import FastAPI,File,UploadFile,HTTPException,status
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from fastapi.responses import JSONResponse
app = FastAPI()

class User(BaseModel):
    username: str
    email: str
    password: str

# Example user database (in-memory list)
users_db = []

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

origins = [
    "http://localhost",
    "http://127.0.0.1:5500"  # Add your front end URL here
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("../models/2")
CLASS_NAMES = ["CrownRot","FruitFasciation","FruitRot","MealyBug","MultipleCrown","NoDisease","RootRot"]
@app.get("/ping")
async def ping():
    return "Alive!"

@app.post("/register")
async def register_user(user: User):
    # Hash the password before storing it in the database
    hashed_password = pwd_context.hash(user.password)
    # Add the user to the database (in this example, an in-memory list)
    users_db.append({
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    })
    return {"message": "User Registration Successful!"}

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

@app.get("/users")
async def get_users():
    return {"users": users_db}

class UserLogin(BaseModel):
    username: str
    password: str
 
@app.post("/login")
async def login_user(user_login: UserLogin):
    # Find the user in the database
    for user in users_db:
        if user["username"] == user_login.username:
            # Check if the password is correct
            if pwd_context.verify(user_login.password, user["password"]):
                # Redirect to another page (change the URL as needed)
                return JSONResponse(content={"redirect": "http://127.0.0.1:5500/index3.html"})
            else:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
if __name__=="__pred__":
    uvicorn.run(app,host='localhost',port=8000)