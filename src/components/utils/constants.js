import { load } from "./storage"

export const options = {
    headers: {
      Authorization: `Bearer ${load('AuthToken')}`,
    },
  }

const name = load('UserData')

export const URL = "https://api.noroff.dev/api/v1/holidaze/venues"
export const SpecificVenue = "https://api.noroff.dev/api/v1/holidaze/venues"
export const LoginURL = "https://api.noroff.dev/api/v1/holidaze/auth/login"
export const RegisterURL = "https://api.noroff.dev/api/v1/holidaze/auth/register"
export const BookingsParameter = "?&_bookings=true"
export const CreateBookingURL = "https://api.noroff.dev/api/v1/holidaze/bookings"
export const BookingsByProfile = `https://api.noroff.dev/api/v1/holidaze/profiles/${name.user}/bookings`

export const SortByCreated = "?sort=created"