import { load } from "./storage"

export const options = {
    headers: {
      Authorization: `Bearer ${load('AuthToken')}`,
    },
  }

//prevent error
let BookingsByProfile = null
let VenuesByProfile = null
let UpdateMedia = null


const name = load('UserData')
if (name && name.user) {
  UpdateMedia = `https://api.noroff.dev/api/v1/holidaze/profiles/${name.user}/media`;
  BookingsByProfile = `https://api.noroff.dev/api/v1/holidaze/profiles/${name.user}/bookings?_venue=true`;
  VenuesByProfile = `https://api.noroff.dev/api/v1/holidaze/profiles/${name.user}/venues`;
}

export const URL = "https://api.noroff.dev/api/v1/holidaze/venues"
export const SpecificVenue = "https://api.noroff.dev/api/v1/holidaze/venues"
export const LoginURL = "https://api.noroff.dev/api/v1/holidaze/auth/login"
export const RegisterURL = "https://api.noroff.dev/api/v1/holidaze/auth/register"
export const BookingsParameter = "?&_bookings=true"
export const BookingURL = "https://api.noroff.dev/api/v1/holidaze/bookings"
export const ProfileURL = "https://api.noroff.dev/api/v1/holidaze/profiles"


export const SortByCreated = "?sort=created"
export { BookingsByProfile, VenuesByProfile, UpdateMedia };