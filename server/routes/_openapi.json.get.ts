export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const hubOpenAPI = await $fetch("/api/_hub/openapi.json").catch(() => null);
  if (!hubOpenAPI) throw createError({ statusCode: 500 });
  const filteredPaths: Record<string, Record<string, any>> = {};
  for (const [path, methods] of Object.entries(hubOpenAPI.paths as Record<string, Record<string, any>>)) {
    let keep = false;
    for (const method in methods) {
      if (
        methods[method]
        && typeof methods[method].description === "string"
        && methods[method].description.trim() !== ""
      ) {
        keep = true;
        break;
      }
    }
    if (keep) filteredPaths[path] = methods;
  }
  hubOpenAPI.info = config.openapi.info;
  delete hubOpenAPI.servers;
  hubOpenAPI.paths = filteredPaths;
  const sortedPaths = Object.entries(hubOpenAPI.paths).sort((a, b) => {
    const aPath = a[0].split("/").slice(2).join("/");
    const bPath = b[0].split("/").slice(2).join("/");
    const aSegments = aPath.split("/");
    const bSegments = bPath.split("/");
    const aFirstSegment = aSegments[0];
    const bFirstSegment = bSegments[0];
    if (aFirstSegment === bFirstSegment) {
      return aSegments.length - bSegments.length;
    }
    return aFirstSegment.localeCompare(bFirstSegment);
  });
  hubOpenAPI.paths = Object.fromEntries(sortedPaths);
  return hubOpenAPI;
});
