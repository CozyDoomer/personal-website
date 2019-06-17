import multiprocessing
from os import environ

port = str(environ.get('PORT', '8080'))

bind = "0.0.0.0:" + port 
workers = multiprocessing.cpu_count() * 2 + 1

max_requests = 512
max_requests_jitter = 64