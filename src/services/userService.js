import httpClient from 'httpClient';
import { FACEBOOK_ACCESS_TOKEN } from 'constants/constants';

class UserService {
  static login(user) {
    return httpClient.post('/users/sign_in', user);
  }

  static logout() {
    return httpClient.delete('/users/sign_out');
  }

  static signUp(user) {
    return httpClient.post('/users', user);
  }

  static loginFacebook() {
    return httpClient.post('/users/facebook', { access_token: FACEBOOK_ACCESS_TOKEN });
  }
}

export default UserService;
