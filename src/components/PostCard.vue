<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body d-flex flex-column">
      <h4 class="card-title">{{post.title}}</h4>
      <p class="card-text flex-grow-1">{{post.body}}</p>
      <p class="text-muted small mb-0">Автор: {{author}}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object,
  author: String,
})
</script>