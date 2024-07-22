export const html = (string: string) => {
  return new Response(string, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
};