#!/bin/python3
from flask import Flask, render_template
from livereload import Server

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/gauge')
def show_gauge():
    # Example: Gauge value
    #value = 5500
    return render_template('gauge.html')

if __name__ == '__main__':
    app.debug = True  # Enable debug mode

    # Create a livereload server
    server = Server(app.wsgi_app)

    # Watch for changes in the templates directory and the script file
    server.watch('templates/*.html')
    server.watch('main.py')
    app.run(host='0.0.0.0', port=80)
