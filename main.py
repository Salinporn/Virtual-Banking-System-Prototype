# from fastapi import FastAPI, Request, Form, Depends, File, UploadFile
# from fastapi.responses import HTMLResponse, RedirectResponse

# from fastapi_login import LoginManager
from object import *

from fastapi import FastAPI, Request
from fastapi import FastAPI, Request, Form, Depends, File, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi.security import OAuth2PasswordRequestForm

import os, base64

from fastapi.security import OAuth2PasswordRequestForm
import ZODB, ZODB.FileStorage
import transaction
import BTrees._OOBTree
import random
import string
from datetime import datetime, timedelta
import os

class NotAuthenticatedException(Exception):
    pass

SECRET = 'xxx'

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

manager = LoginManager(SECRET, token_url='/login', use_cookie=True, custom_exception=NotAuthenticatedException)
manager.cookie_name = "session"

storage = ZODB.FileStorage.FileStorage('data/bankData.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

# #create root if it does not exist
if not hasattr(root, "customers"):
    root.customers = BTrees.OOBTree.BTree()
if not hasattr(root, "admin"):
    root.admin = BTrees.OOBTree.BTree()
  
#load user
# @manager.user_loader()
# def load_user(email: str):
#     user = None

#     for t in root.teachers:
#         if email == root.teachers[t].getEmail():
#             user = root.teachers[t]
    
#     for s in root.students:
#         if email == root.students[s].getEmail():
#             user = root.students[s]

#     return user

#check if the user is login
# @app.exception_handler(NotAuthenticatedException)
# def auth_exception_handler(request: Request, exc: NotAuthenticatedException):
#     return RedirectResponse(url='/login')

#redirect to the correct home page (teacher or student)
# @app.get("/", response_class=HTMLResponse)
# async def redirect(request: Request, user_info=Depends(manager)):
#     if isinstance(user_info, Student):
#         return RedirectResponse(url="/home_student", status_code=302)
#     elif isinstance(user_info, Teacher):
#         return RedirectResponse(url="/home_teacher", status_code=302)
 
#login
@app.get("/", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("withdrawalReview.html", {"request": request})

#home
@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/transfer", response_class=HTMLResponse)
async def transfer(request: Request):
    return templates.TemplateResponse("transfer.html", {"request": request})

@app.get("/withdraw", response_class=HTMLResponse)
async def withdraw(request: Request):
    return templates.TemplateResponse("withdrawal.html", {"request": request})

@app.get("/withdraw/review", response_class=HTMLResponse)
async def withdrawReview(request: Request):
    return templates.TemplateResponse("withdrawalReview.html", {"request": request})

@app.get("/transfer/review", response_class=HTMLResponse)
async def transferReview(request: Request):
    return templates.TemplateResponse("transferReview.html", {"request": request})
         
@app.get("/currency-exchange", response_class=HTMLResponse)
async def currencyExchange(request: Request):
    return templates.TemplateResponse("currencyExchange.html", {"request": request})