import api from "@/lib/axios";

export default {
    create(data) {
        return api.post("/bookings", data);
    },
    getByDate(date) {
        return api.get(`/bookings?date=${date}`);
    },
    getUserBookings(userId) {
        return api.get(`/users/${userId}/bookings`);
    },
    getById(bookingId) {
        return api.get(`/bookings/${bookingId}`);
    },
    update(bookingId, data) {
        return api.put(`/bookings/${bookingId}`, data);
    },
    delete(bookingId) {
        return api.delete(`/bookings/${bookingId}`);
    },
}