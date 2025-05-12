<script setup lang="ts">
import { ApiReference } from "@scalar/api-reference";
import type { AnyApiReferenceConfiguration } from "@scalar/types/api-reference";

const configuration: AnyApiReferenceConfiguration = {
  theme: "saturn",
  darkMode: true,
  hideModels: false,
  metaData: {
    title: SITE.title,
    description: SITE.description,
    version: SITE.version
  },
  defaultOpenAllTags: true,
  hideDownloadButton: true,
  defaultHttpClient: {
    targetKey: "js",
    clientKey: "fetch"
  },
  pathRouting: {
    basePath: "/"
  },
  url: "/_openapi"
};
</script>

<template>
  <main>
    <ApiReference :configuration="configuration" />
  </main>
</template>
