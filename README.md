# ejercicio-nanlabs-ibarlucea


1. Installation
2. Project Structure
3. Environment Variables

### 1. Instalación

It's necessary to have both Nodejs and npm installed.
These can be installed and administered with NVM: 1ttps://github.com/nvm-sh/nvm.

To initialize the proyect you mist first download it from the git repository.

Dependencies are installed by running: `npm install`


### 2. Project Structure

The app is initialized on `index.js`, it loads variables from the `.env`file through the dotenv library.
Once these variables are loaded the routes are registered.

Our API's routes are loaded from the `routes.js`file, each route pointing to a controller which runs Express logic.

### 3. Environment Variables

Depending of the necessities of our proyect, the `.env`file must be created and configurated like so:

``` sh
#TRELLO API
TRELLO_API_KEY= "example.key"
TRELLO_API_TOKEN="emaple.token"

#BOARD DATA
TRELLO_BOARD_ID="example.board.id"
```

`TRELLO_API_KEY` and `TRELLO_API_TOKEN` are obtain by accessing `https://trello.com/app-key`

Then you just edit `TRELLO_BOARD_ID` with whatever Trello Board you decide to use for the task management.

