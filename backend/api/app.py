import os
from io import StringIO
import pandas as pd
import requests
import json

from flask import Flask, request
from flask_cors import CORS

from .s3_backend.s3_storage import (get_disease_table_presigned_url,
                                    get_export_history_presigned_url,
                                    get_premium_table_presigned_url, put_csv_file_into_s3)

origins = [
    "http://localhost",
    "http://localhost:4200",
]

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 1000 * 1024 * 1024    # 50 Mb limit

# @app.get('/')
# def root():
#     return {'hello': 'world'}


# @app.get('/file')
# def download_file():
#     path = 'tmp/return.csv'
#     return FileResponse(path=path, filename='return.csv', media_type='text/csv')


# @app.get('/premium-table')
# def download_premium_table():
#     path = 'tmp/byproduct/Elite_health.csv'
#     return FileResponse(path=path, filename='return.csv', media_type='text/csv')


# @app.post('/premium-table')
# def upload_premium_table(req: Request):
#     body = req.body
#     print(body)
#     return ['success']


@app.route("/export_history", methods=['GET'])
def export_history():
    filename = request.args.get('filename')
    print(filename)
    presigned = get_export_history_presigned_url(filename)
    return {'url': presigned}


@app.route("/export_premium_table", methods=['GET'])
def export_premium_table():
    package_name = request.args.get('package_name')
    print(package_name)
    presigned = get_premium_table_presigned_url(package_name)
    return {'url': presigned}


@app.route("/export_disease_table", methods=['GET'])
def export_disease_table():
    package_name = request.args.get('package_name')
    print(package_name)
    presigned = get_disease_table_presigned_url(package_name)
    return {'url': presigned}


@app.route("/create_backup_history", methods=['POST'])
def create_backup_history():
    csv_buffer = StringIO()
    json_list = request.get_json()
    print(json_list)
    package_name = json_list['package_name']
    doc_type = json_list['type']
    username = json_list['username']
    print(package_name, doc_type, username)

    if doc_type == 'disease':
        # output = None
        # df = pd.DataFrame.from_dict([doc['_source'] for doc in output])
        # df.to_csv(csv_buffer)
        # resp = put_csv_file_into_s3(
        #     username, package_name, doc_type, 'premium-table', csv_buffer)
        # return resp
        return {'status': 501, 'message': 'Not implemented'}
    elif doc_type == 'premium':
        # output = None
        # df = pd.DataFrame.from_dict([doc['_source'] for doc in output])
        # df.to_csv(csv_buffer)
        # resp = put_csv_file_into_s3(
        #     username, package_name, doc_type, 'premium-table', csv_buffer)
        # return resp
        return {'status': 501, 'message': 'Not Implemented'}
    elif doc_type == 'faq':
        output = get_faq_from_package(package_name, 10000, 0)
        # print(output['hits']['hits'])
        df = pd.DataFrame.from_dict([doc['_source'] for doc in output['hits']['hits']])
        df.to_csv(csv_buffer)
        resp = put_csv_file_into_s3(
            username, package_name, doc_type, 'edit-history', csv_buffer)
        return resp
    elif doc_type == 'kb':
        # output = get_kb_from_package(package_name, 10000, 0)
        # df = pd.DataFrame.from_dict([doc['_source'] for doc in output])
        # df.to_csv(csv_buffer)
        # resp = put_csv_file_into_s3(
        #     username, package_name, doc_type, 'edit-history', csv_buffer)
        return {'status': 501, 'message': 'Not implemented yet'}
    else:
        return {'status': 403, 'message': 'Forbidden'}


def get_faq_from_package(package_name, size, start_index):
    data = {
        "query": {
            "bool": {
                "must": [
                    {"match_phrase": {"package_type":  package_name}}
                ]
            }
        },
        "size": size,
        "from": start_index,
        "_source": {
            "excludes": ["question_hub"]
        }
    }
    headers = {'Content-type': 'application/json'}
    url = ''
    r = requests.post(url, data=json.dumps(data), headers=headers)
    outputs = json.loads(r.text)
    return outputs
