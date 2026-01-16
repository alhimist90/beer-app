<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useBeerStore } from '../stores/beerStore'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const beerStore = useBeerStore()

const beerId = parseInt(route.params.id)
const beer = computed(() => beerStore.getBeerById(beerId))

const handleDelete = () => {
  if (confirm('Вы уверены, что хотите удалить это пиво?')) {
    beerStore.removeBeer(beerId)
    router.push('/')
  }
}

const handleGoBack = () => {
  router.push('/')
}

const handleRatingChange = (delta) => {
  if (beer.value) {
    let newRating = beer.value.rating + delta
    newRating = Math.max(0, Math.min(5, newRating))
    beerStore.updateBeerRating(beerId, newRating)
  }
}
</script>

<template>
  <div v-if="beer" class="beer-detail">
    <header class="header">
      <button @click="handleGoBack" class="btn-back">← Назад</button>
      <h1>{{ beer.name }}</h1>
      <button @click="handleDelete" class="btn-delete">🗑 Удалить</button>
    </header>

    <main class="container">
      <div class="detail-content">
        <div class="image-section">
          <img :src="beer.imageUrl" :alt="beer.name" class="beer-image" />
        </div>

        <div class="info-section">
          <div class="info-group">
            <label>Стиль:</label>
            <p>{{ beer.style }}</p>
          </div>

          <div class="info-group">
            <label>Пивоварня:</label>
            <p>{{ beer.brewery }}</p>
          </div>

          <div class="info-group">
            <label>Описание:</label>
            <p>{{ beer.description || 'Описание отсутствует' }}</p>
          </div>

          <div class="rating-section">
            <label>Рейтинг:</label>
            <div class="rating-controls">
              <button @click="handleRatingChange(-0.5)" class="btn-rating">-</button>
              <span class="rating-display">{{ beer.rating.toFixed(1) }} ⭐</span>
              <button @click="handleRatingChange(0.5)" class="btn-rating">+</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div v-else class="not-found">
    <h2>Пиво не найдено 😞</h2>
    <button @click="handleGoBack" class="btn-back">Вернуться на главную</button>
  </div>
</template>

<style scoped>
.beer-detail {
  width: 100%;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, #d4a574 0%, #8b6914 100%);
  color: white;
  margin-bottom: 30px;
  gap: 20px;
}

.header h1 {
  margin: 0;
  flex: 1;
  font-size: 2rem;
  text-align: center;
}

.btn-back,
.btn-delete {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-back:hover,
.btn-delete:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.beer-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-group {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.info-group label {
  display: block;
  font-weight: bold;
  color: #8b6914;
  margin-bottom: 8px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-group p {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  line-height: 1.5;
}

.rating-section {
  margin-top: 20px;
}

.rating-section label {
  display: block;
  font-weight: bold;
  color: #8b6914;
  margin-bottom: 12px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rating-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-rating {
  width: 40px;
  height: 40px;
  border: 2px solid #8b6914;
  background: white;
  color: #8b6914;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-rating:hover {
  background: #8b6914;
  color: white;
  transform: scale(1.1);
}

.rating-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffa500;
  min-width: 80px;
  text-align: center;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found h2 {
  font-size: 2rem;
  color: #8b6914;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .header {
    flex-wrap: wrap;
  }

  .header h1 {
    width: 100%;
    order: 2;
  }
}
</style>
