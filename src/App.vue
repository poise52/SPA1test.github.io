<script>
import PostCard from "./components/PostCard.vue";

export default {
  name: "App",
  components: {PostCard: PostCard}
}
</script>

<template>
  <div class="container p-4">
    <h1 class="mb-4">Публикации</h1>
    <input
        v-model="search"
        type="text"
        class="form-control mb-4"
        placeholder="Фильтр по автору."
    />

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка.</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{error}}</div>


    <transition-group name="list" tag="div" class="row" v="else">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="col-md-4 mb-4"
      >
        <PostCard :post="post" :author="GetAuthorName(post.userId)" />
      </div>
    </transition-group>

    <div v-if="!loading && filteredPosts.length === 0" class="text-center">
      <p>Ничего не найдено</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const posts = ref([])
const users = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')

onMounted(async () => {
  try {
    const [postsRes, usersRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users'),
    ])

    if (!postsRes.ok || !usersRes.ok) {
      throw new Error('Ощибка загрузки данных')
    }

    posts.value = await postsRes.json()
    users.value = await usersRes.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const GetAuthorName = (userId) => {
  const user = users.value.find(u => u.id === userId)
  return user ? user.username : 'Неизвестный автор'
}

const filteredPosts = computed(() => {
  if (!search.value.trim()) {
    return posts.value
  }
  return posts.value.filter(post => {
    const authorName = GetAuthorName(post.userId).toLowerCase()
    return authorName.includes(search.value.trim().toLowerCase())
  })
})
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.lis-enter-from, .lis-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>