[uwsgi]
master = true
processes = 4
http  = :80
module = app.config.wsgi
enable-threads = true
single-interpreter = true
die-on-term = true
harakiri = 60
harakiri-verbose = true
buffer-size = 65535
chdir = /code/
{% if DEBUG %}python-autoreload = 1{% endif %}