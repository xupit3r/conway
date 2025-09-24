<script setup lang="ts">
import Container from "@/components/Container.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Container>
    <Header>
      <slot name="header"></slot>
    </Header>
    <main>
      <slot></slot>
    </main>
    <Footer>
      <slot name="footer"></slot>
    </Footer>
  </Container>
</template>

<style lang="css" scoped></style>