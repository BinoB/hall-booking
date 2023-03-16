The steps to test each of the API endpoints in Postman:

1.Create a Room

Set the request method to POST, and enter the API endpoint URL: http://localhost:5000/rooms.
Select the "Body" tab in Postman and choose "raw". Set the request body to JSON format, for example:
json

Sample data
                        {
                        "seats": 10,
                        "amenities": ["AC","projector"],
                        "price": 100
                        }
Click on the "Send" button to send the POST request to create a new room.

-----------------------------------------------------------------------------------------------------

2.Book a Room

Set the request method to POST, and enter the API endpoint URL: http://localhost:5000/bookings.
Select the "Body" tab in Postman and choose "raw". Set the request body to JSON format, for example:
json

Sample data
                        {
                        "customerName": "John",
                        "date": "2022-03-20",
                        "startTime": "09:45",
                        "endTime": "12:00",
                        "roomId": 1
                        }

Click on the "Send" button to send the POST request to book a room.
--------------------------------------------------------------------------------------------------------------

3.List all Rooms with Booked Data

Set the request method to GET, and enter the API endpoint URL: http://localhost:5000/rooms/bookings.
Click on the "Send" button to send the GET request to list all rooms with booked data.

--------------------------------------------------------------------------------------------------------------

4.List all customers with booked Data

Set the request method to GET, and enter the API endpoint URL: http://localhost:5000/customers/bookings.
Click on the "Send" button to send the GET request to list all customers with booked data.

--------------------------------------------------------------------------------------------------------------

5.List how many times a customer has booked the room

Set the request method to GET, and enter the API endpoint URL with the customer's name: http://localhost:5000/customers/(name of the customer)/bookings.

Click on the "Send" button to send the GET request to list how many times John Doe has booked the room.