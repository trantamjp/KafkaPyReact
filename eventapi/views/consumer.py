import json
import time

from flask import Response, current_app, jsonify, request
from flask.views import MethodView
from kafka import KafkaConsumer

KAFKA_SERVER = 'localhost:9092'


class ConsumerAPI(MethodView):
    def get(self):
        args = request.json if request.is_json else {}

        consumer = KafkaConsumer(bootstrap_servers=KAFKA_SERVER)
        consumer.subscribe(['login', 'logout', 'viewpage'])

        def eventStream():
            while(True):
                for msg in consumer:
                    print(msg)
                    yield(
                        "event: {}Event\n".format(msg.topic) +
                        "data: {}\n\n".format(msg.value.decode()))
                time.sleep(1)

        return Response(eventStream(), mimetype="text/event-stream")
