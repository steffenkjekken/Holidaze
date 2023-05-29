import { ProfileURL } from "./constants";
import { load } from "./storage";

export const checkToken = async () => {
  try {
    const token = load('AuthToken');
    const user = load('UserData');
    console.log(token);

    if (!token) {
      return false; // Token is not present
    }

    const response = await fetch(ProfileURL + "/" + user.user, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};