# ENDPOINTS

## PING

- Method: GET
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/
- Body:
- Response: status(200), {"message": "pong"}

## LOGIN

- Method: POST
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/user/login
- Body: {"username":"admin", "password":"admin"}
- Response: status(200), {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmN2U1ODUxODkzMDVlMjhhNTdkNTUiLCJuYW1lIjoiSm9ubnkiLCJpYXQiOjE2ODU3MjUyMzEsImV4cCI6MTY4NjMzMDAzMX0.\_kBXLN1POnzVWTQl8Y7PxIvSU5mssGyNy5SGZ4zLJuk"}

## GET

- Method: GET
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/boardgames
- Body:
- Response: status(200), {"boardgames":"[{boardgame1}, {boardgame2}...,]"}

## DELETE

- Method: DELETE
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/boardgames/BoardgameId
- Body:
- Response: status(200), {"message: "Boardgame deleted!"}
