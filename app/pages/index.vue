<script setup lang="ts">
import type { AnyApiReferenceConfiguration } from "@scalar/types/api-reference";

const { data: openapiContent } = useFetch("/_openapi.json");

const configuration: AnyApiReferenceConfiguration = {
  darkMode: true,
  hideModels: false,
  metaData: {
    title: SITE.title,
    description: SITE.description,
    version: SITE.version
  },
  defaultOpenAllTags: true,
  hideDownloadButton: true,
  content: openapiContent.value
};
</script>

<template>
  <main>
    <ScalarApiReference :configuration="configuration" />
  </main>
</template>
