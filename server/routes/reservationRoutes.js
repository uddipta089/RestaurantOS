const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', reservationController.createReservation); // Customers can create, might need customer auth later
router.get('/branch/:branchId', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager', 'Waiter'), reservationController.getReservations);
router.get('/:id', authenticateUser, reservationController.getReservationById);
router.put('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager', 'Waiter'), reservationController.updateReservation);
router.delete('/:id', authenticateUser, reservationController.cancelReservation); // Typically a cancellation

module.exports = router;
