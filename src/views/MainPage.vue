<script setup>
import { useBeerStore } from '../stores/beerStore'
import { useRouter } from 'vue-router'
import BeerCard from '../components/BeerCard.vue'

const beerStore = useBeerStore()
const router = useRouter()

const goToAddBeer = () => {
  router.push('/add')
}

const goToBeerDetail = (id) => {
  router.push(`/beer/${id}`)
}
</script>

<template>
  <div class="home">
    <header class="header">
      <h1>🍺 Beer App</h1>
      <button @click="goToAddBeer" class="btn-add">+ Добавить пиво</button>
    </header>

    <main class="container">
      <section class="beers-list">
        <h2>Популярное пиво (по рейтингу)</h2>
        <div class="beer-grid">
          <BeerCard
            v-for="beer in beerStore.beersByRating"
            :key="beer.id"
            :beer="beer"
            @click="goToBeerDetail(beer.id)"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #d4a574 0%, #8b6914 100%);
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.btn-add {
  padding: 12px 24px;
  background: white;
  color: #8b6914;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.beer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

h2 {
  color: #8b6914;
  font-size: 1.8rem;
  margin-bottom: 20px;
}
</style>
