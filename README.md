# digiDash
This is an app that establishes a connection with the K-Line bus present on a MEMS1.9 ECU and presents a digital dash.

It uses a docker container running python and flask in order to present data in a user-friendly way.

How to set up:

Firstly, clone the directory.

Change into the directory and run the command below to build the docker image.

`docker build -t digidash .`

Then, run the following command in order to run the docker image.

`docker run -it -p 4000:80 digidash`

In the future, more commands shall be added in order to run a browser in kiosk mode in order to connect to the container's webpage and connect to the serial port.