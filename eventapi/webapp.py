from . import app, routes

api_blueprint = routes.api_blueprint
app.register_blueprint(api_blueprint)
