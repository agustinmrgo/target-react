import httpClient from 'httpClient';

class TargetService {
  static createTarget(target) {
    return httpClient.post('/targets', target);
  }

  static destroyTarget(targetId) {
    return httpClient.delete(`/targets/${targetId}`);
  }

  static getAllTargets(body) {
    return httpClient.get('/targets', body);
  }
}

export default TargetService;
