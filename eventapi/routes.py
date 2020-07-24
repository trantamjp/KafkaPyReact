from flask import Blueprint
from .views import EventLoginAPI, EventLogoutAPI, EventViewPageAPI, ConsumerAPI

api_blueprint = Blueprint('event', __name__, url_prefix='/events')

api_blueprint.add_url_rule(
    '/login',
    view_func=EventLoginAPI.as_view("EventLoginAPI")
)

api_blueprint.add_url_rule(
    '/logout',
    view_func=EventLogoutAPI.as_view("EventLogoutAPI")
)

api_blueprint.add_url_rule(
    '/viewpage',
    view_func=EventViewPageAPI.as_view("EventViewPageAPI")
)

api_blueprint.add_url_rule(
    '/consumer',
    view_func=ConsumerAPI.as_view("ConsumerAPI")
)
