import json

from flask import current_app, jsonify, request
from flask.views import MethodView
from kafka import KafkaProducer
from datetime import datetime

KAFKA_SERVER = 'localhost:9092'


class EventLoginAPI(MethodView):
    def post(self):
        args = request.json if request.is_json else {}
        args['eventTime'] = datetime.now().isoformat()

        producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER,
                                 value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        producer.send('login', args)
        return '', 204


class EventLogoutAPI(MethodView):
    def post(self):
        args = request.json if request.is_json else {}
        args['eventTime'] = datetime.now().isoformat()

        producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER,
                                 value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        producer.send('logout', args)
        return '', 204


class EventViewPageAPI(MethodView):
    def post(self):
        args = request.json if request.is_json else {}
        args['eventTime'] = datetime.now().isoformat()

        producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER,
                                 value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        producer.send('viewpage', args)
        return '', 204
