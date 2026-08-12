export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const nitroOpenAPI = await $fetch("/_openapi.json").catch(() => null);
  if (!nitroOpenAPI) throw createError({ statusCode: 500 });
  const filteredPaths: Record<string, Record<string, any>> = {};
  for (const [path, methods] of Object.entries(nitroOpenAPI.paths as Record<string, Record<string, any>>)) {
    const filteredMethods: Record<string, any> = {};
    for (const [method, details] of Object.entries(methods)) {
      if (!details.tags || (!details.tags.includes("Internal") && !details.tags.includes("App Routes"))) {
        filteredMethods[method] = details;
      }
    }
    if (Object.keys(filteredMethods).length > 0) {
      filteredPaths[path] = filteredMethods;
    }
  }
  nitroOpenAPI.info = config.openapi.info;
  delete nitroOpenAPI.servers;
  nitroOpenAPI.paths = filteredPaths;
  const sortedPaths = Object.entries(nitroOpenAPI.paths).sort((a, b) => {
    const aPath = a[0].split("/").slice(2).join("/");
    const bPath = b[0].split("/").slice(2).join("/");
    const aSegments = aPath.split("/");
    const bSegments = bPath.split("/");
    const aFirstSegment = aSegments[0] ?? "";
    const bFirstSegment = bSegments[0] ?? "";
    if (aFirstSegment === bFirstSegment) {
      return aSegments.length - bSegments.length;
    }
    return aFirstSegment.localeCompare(bFirstSegment);
  });
  nitroOpenAPI.paths = Object.fromEntries(sortedPaths);
  return nitroOpenAPI;
});
