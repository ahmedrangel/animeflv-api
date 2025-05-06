import { type IRequest, error, json } from "itty-router";

interface CachedOptions {
  req: IRequest;
  ctx: ExecutionContext;
  ttl: number;
}

interface GetResponseData {
  success: boolean;
  data?: any;
  status?: number;
  error?: string;
}

export const handleCachedResponse = async (options: CachedOptions, getData: () => Promise<GetResponseData>): Promise<Response> => {
  const { req, ctx, ttl } = options;
  const cacheKey = new Request(req.url);
  const cache = caches.default;

  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      const expiresAt = cachedResponse.clone().headers.get("Expires");
      if (new Date(expiresAt).getTime() > Date.now()) {
        return cachedResponse;
      }
      await cache.delete(cacheKey);
    }

    const data = await getData();

    if (!data?.success) return error(data.status || 500, data?.error || "Internal Server Error");

    const response = json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, max-age=${ttl}`,
        "Expires": new Date(Date.now() + ttl * 1000).toUTCString()
      }
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  }
  catch (error) {
    console.error("Error creating cached response:", error);
    ctx.waitUntil(cache.delete(cacheKey));
    return error(500, "Internal Server Error");
  }
};