<script setup lang="ts">
import type { AnyApiReferenceConfiguration } from "@scalar/types/api-reference";

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
  url: "/_openapi.json"
};
</script>

<template>
  <main>
    <ScalarApiReference :configuration="configuration" />
  </main>
</template>
