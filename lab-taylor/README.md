# HTTP Server/Cow Say

This simple server allows you to make GET and POST requests to the cowsay route, and recieve a response based on the input.
You will need HTTPie to use this application, if you don't already have it installed, you can run `brew install httpie`.

### Libraries

This app utilizes one npm module, `cowsay`. Run `npm i` from the command line while in the route directory of the app
to install it.

### Starting the server
To start the http server, run `npm run start` from the command line.

### GET Requests 
In a seperate tab of your terminal, you can run a few different GET requests--

 - `http :3000` Will run a GET request to the home route of the server, and should return a simple 'hello' message and status code

 - `http :3000/cowsay text='<message>'` Will run a GET request to the cowsay route. On success, you will see a pretty cute cow, speakin' that message. If not, she'll tell you 'Bad Request'.

### POST Requests 

 - `http POST :3000/cowsay text='<message>'` Will run a POST request to the cowsay route. On success, you will see a pretty cute cow, speakin' that message. If not, she'll tell you 'Bad Request'.
 
