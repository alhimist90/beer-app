<script setup>
defineProps({
  beer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <div class="beer-card" @click="emit('click')">
    <div class="beer-image">
      <img :src="beer.imageUrl" :alt="beer.name" />
    </div>
    <div class="beer-info">
      <h3>{{ beer.name }}</h3>
      <p class="style">{{ beer.style }}</p>
      <p class="brewery">{{ beer.brewery }}</p>
      <div class="rating">
        <span class="stars">⭐ {{ beer.rating.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.beer-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.beer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.beer-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.beer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.beer-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.beer-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: #333;
}

.style {
  margin: 4px 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.brewery {
  margin: 4px 0;
  color: #999;
  font-size: 0.85rem;
  flex-grow: 1;
}

.rating {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stars {
  color: #ffa500;
  font-weight: bold;
}
</style>
