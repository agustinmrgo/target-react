import httpClient from 'httpClient';

class TopicService {
  static getAllTopics(body) {
    return httpClient.get('/topics', body);
  }
}

export default TopicService;
