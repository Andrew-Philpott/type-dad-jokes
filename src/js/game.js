
export class Game {
    async getNews(news) {
      try {
        let response = await fetch(`http://newsapi.org/v2/everything?q=${news}&apiKey=53408179452042078867cb5251efbeb6`)
        let jsonifiedResponse = await response.json();
        return jsonifiedResponse;
      } catch(error) {
        console.error("There was an error handling your request: " + error.message);
      }
    }
}