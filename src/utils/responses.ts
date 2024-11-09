export const sendRedirect = (url: string, status: 301 | 302) => {
  return new Response(null, { status, headers: { Location: url } });
};