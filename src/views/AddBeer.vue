<script setup>
import { ref } from 'vue'
import { useBeerStore } from '../stores/beerStore'
import { useRouter } from 'vue-router'

const beerStore = useBeerStore()
const router = useRouter()

const form = ref({
  name: '',
  style: '',
  brewery: '',
  rating: 3,
  imageUrl: 'https://via.placeholder.com/150?text=Beer',
  description: ''
})

const styles = ['Lager', 'Stout', 'IPA', 'Pilsner', 'Porter', 'Ale', 'Wheat Beer', 'Sour']

const handleSubmit = () => {
  if (!form.value.name || !form.value.style || !form.value.brewery) {
    alert('Пожалуйста, заполните все поля!')
    return
  }

  beerStore.addBeer(form.value)
  router.push('/')
}

const handleCancel = () => {
  router.push('/')
}
</script>

<template>
  <div class="add-beer">
    <header class="header">
      <h1>Добавить новое пиво</h1>
    </header>

    <main class="container">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="name">Название пива *</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Например: Guinness"
            required
          />
        </div>

        <div class="form-group">
          <label for="style">Стиль пива *</label>
          <select v-model="form.style" id="style" required>
            <option value="">Выберите стиль</option>
            <option v-for="s in styles" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="brewery">Пивоварня *</label>
          <input
            v-model="form.brewery"
            type="text"
            id="brewery"
            placeholder="Например: Guinness Brewery"
            required
          />
        </div>

        <div class="form-group">
          <label for="rating">Рейтинг (0-5)</label>
          <div class="rating-input">
            <input v-model.number="form.rating" type="range" id="rating" min="0" max="5" step="0.1" />
            <span class="rating-value">{{ form.rating.toFixed(1) }} ⭐</span>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Описание</label>
          <textarea
            v-model="form.description"
            id="description"
            placeholder="Опишите вкус и характеристики пива..."
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="imageUrl">URL изображения</label>
          <input
            v-model="form.imageUrl"
            type="url"
            id="imageUrl"
            placeholder="https://example.com/image.jpg"
          />
          <div v-if="form.imageUrl" class="image-preview">
            <img :src="form.imageUrl" :alt="form.name" />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">✓ Добавить</button>
          <button type="button" @click="handleCancel" class="btn-cancel">✕ Отмена</button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.add-beer {
  width: 100%;
  min-height: 100vh;
}

.header {
  padding: 20px;
  background: linear-gradient(135deg, #d4a574 0%, #8b6914 100%);
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b6914;
  box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rating-input input {
  flex: 1;
  margin: 0;
}

.rating-value {
  min-width: 50px;
  color: #ffa500;
  font-weight: bold;
}

.image-preview {
  margin-top: 15px;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #ddd;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn-submit,
.btn-cancel {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit {
  background: #8b6914;
  color: white;
}

.btn-submit:hover {
  background: #6b5410;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 105, 20, 0.3);
}

.btn-cancel {
  background: #ddd;
  color: #333;
}

.btn-cancel:hover {
  background: #ccc;
}
</style>
