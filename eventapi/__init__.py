import os

from flask import Flask
from flask_cors import CORS

from .config import Config

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config.from_object(Config)
