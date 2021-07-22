import boto3
from .config import S3_ACCSESS_KEY, S3_SECRET_KEY
from datetime import datetime
from datetime import datetime, timezone
from elasticsearch import Elasticsearch

s3 = boto3.client('s3', region_name='ap-southeast-1',
                  aws_access_key_id=S3_ACCSESS_KEY, aws_secret_access_key=S3_SECRET_KEY)

bucket_name = 'chatbot-data-dms'


def get_premium_table_presigned_url(package_name):
    # print(package_name)
    folder = 'premium-table'
    key = f'{package_name}.csv'
    presigned_url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': f'{folder}/{key}'
        },
        ExpiresIn=300)
    return presigned_url


def get_disease_table_presigned_url(package_name):
    # print(package_name)
    folder = 'disease-table'
    key = f'{package_name}.csv'
    presigned_url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': f'{folder}/{key}'
        },
        ExpiresIn=300)
    return presigned_url


def get_export_history_presigned_url(filename):
    folder = 'edit-history'
    key = filename
    presigned_url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': f'{folder}/{key}'
        },
        ExpiresIn=300)
    return presigned_url


def put_csv_file_into_s3(username, package_name, doc_type, dest, io_buffer):
    folder = dest
    if folder == 'edit-history':
        now = datetime.now(timezone.utc)
        filename = f'{now}_backup_{package_name}_by_{username}.csv'
        edited_date = now.strftime('%b %d %Y %I:%M%p')
        add_edit_history(filename, edited_date, doc_type,
                         package_name, username)
    else:
        filename = f'{package_name}.csv'
    resp = s3.put_object(Bucket=bucket_name, Body=io_buffer.getvalue(),
                         Key=f'{folder}/{filename}')
    return resp


def add_edit_history(document_name, edited_date, type_string, package_name, username):
    es = Elasticsearch(
        '')
    doc = {"document_name": document_name, "edited_date": edited_date,
           "type": type_string, "package_name": package_name, "username": username}
    es.index(index="edit_history", doc_type="_doc",
             id=doc["age"], body={"doc": doc})
    return True
