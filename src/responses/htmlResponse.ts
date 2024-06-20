class HtmlResponse extends Response {
  constructor(html: string) {
    const options = {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      }
    };
    super(html, options);
  }
}

export default HtmlResponse;