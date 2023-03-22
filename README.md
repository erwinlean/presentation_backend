## Game api to save information in DB, and traslate to the presentation web

Returns:
- Name inputed when game ends
- Points obteined in the game
- Total times the game was played

____________________________________________________________________________

## All responses are returned in JSON format.

##### Base URL: https://sore-erin-goldfish-tutu.cyclic.app/

## Endpoints
#### GET /game/
Returns all game data, including user names, game points, and times played.

Response
200 OK on success
json
```
[
    ["user1", 500, 3],
    ["user2", 1000, 5],
    ["user3", 750, 4]
]
```
#### GET /game/users
Returns an array of all user names.

Response
200 OK on success
json
```
[
    {"usersName": "user1"},
    {"usersName": "user2"},
    {"usersName": "user3"}
]
```
#### GET /game/points
Returns an array of all game points.

Response
200 OK on success
json
```
[
    {"gamePoints": 500},
    {"gamePoints": 1000},
    {"gamePoints": 750}
]
```
#### GET /game/timesplayed
Returns the total number of times the game has been played.

Response
200 OK on success
json
```
{"timesPlayed": 12}
```
#### POST /game/add
Adds new game data to the database.

Request Body
json for post
```
{
    "usersName": "user4",
    "gamePoints": 800,
    "timesPlayed": 2
}
```
Response

201 Created on success
json
```
{"message": "Game data added successfully"}
```

Errors
500 Internal Server Error
This error is returned when there is an internal server error, such as a database connection issue.
json
```
{"message": "Internal Server Error"}
```

#### DELETE /game/deleteUser/usernameHere
Adds new game data to the database.
example data:
```
{
    "usersName": "user4",
    "gamePoints": 800,
    "timesPlayed": 2
}
```
200 User deleted successfully
json
```
{ message: "User deleted successfully" }
```
404 Not Found
Error when user is not found at DataBase
json
```
{ message: "User not found" }
```
500 Internal Server Error
This error is returned when there is an internal server error, such as a database connection issue.
json
```
{"message": "Internal Server Error"}
```

____________________________________________________________________________

#### To improve/Change:
- Posible login for game
- Modify Cors
- Modify  urls: https://sore-erin-goldfish-tutu.cyclic.app/ should not return Express title, also the path should be like  https://sore-erin-goldfish- tutu.cyclic.app/api/v1/game etc...
