<script setup lang="ts">
const colorMode = ref("dark-mode");
onBeforeMount(() => {
  const mode = localStorage.getItem("colorMode");
  colorMode.value = mode === "dark" ? "dark-mode" : "light-mode";
});

useHead({
  bodyAttrs: { class: colorMode }
});
</script>

<template>
  <NuxtPage />
</template>
