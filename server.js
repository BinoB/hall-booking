const express = require("express");
const app = express();

const rooms = [];
const bookings = [];

app.use(express.json());

// Create a Room
app.post("/rooms", (req, res) => {
  const { seats, amenities, price } = req.body;
  const room = { id: rooms.length + 1, seats, amenities, price };
  rooms.push(room);
  res.status(201).json(room);
});

// Booking a Room
app.post("/bookings", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Check if the room is already booked
  const alreadyBooked = bookings.find(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime))
  );

  if (alreadyBooked) {
    res
      .status(400)
      .json({ message: "The room is already booked for this date and time." });
    return;
  }

  // Create a new booking
  const booking = {
    id: bookings.length + 1,
    customerName,
    date,
    startTime,
    endTime,
    roomId,
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

// List all Rooms with Booked Data
app.get("/rooms/bookings", (req, res) => {
  const roomBookings = rooms.map((room) => {
    const booking = bookings.find((booking) => booking.roomId === room.id);
    return {
      roomName: `Room ${room.id}`,
      bookedStatus: !!booking,
      customerName: booking ? booking.customerName : null,
      date: booking ? booking.date : null,
      startTime: booking ? booking.startTime : null,
      endTime: booking ? booking.endTime : null,
    };
  });
  res.status(200).json(roomBookings);
});

// List all customers with booked Data
app.get("/customers/bookings", (req, res) => {
  const customerBookings = bookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: `Room ${room.id}`,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });
  res.status(200).json(customerBookings);
});

// List how many times a customer has booked the room
app.get("/customers/:name/bookings", (req, res) => {
  const { name } = req.params;
  const customerBookings = bookings
    .filter((booking) => booking.customerName === name)
    .map((booking) => {
      const room = rooms.find((room) => room.id === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: `Room ${room.id}`,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id,
        bookingDate: new Date().toISOString(),
        bookingStatus: "Confirmed",
      };
    });
  res.status(200).json(customerBookings);
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
