from storages.backends.s3boto3 import S3Boto3Storage

class MediaStorage(S3Boto3Storage):
    default_acl = 'public-read'
    file_overwrite = False

class StaticFileStorage(S3Boto3Storage):
    location='static'
    default_acl = 'public-read'
    file_overwrite=False