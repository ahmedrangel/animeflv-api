export const html = (string: string) => {
  return new Response(string, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
};

export const sendRedirect = (url: string, status: 301 | 302) => {
  return new Response(null, { status, headers: { Location: url } });
};