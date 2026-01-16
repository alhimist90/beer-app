import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBeerStore = defineStore('beer', () => {
  // Массив с пивом - это наше хранилище данных
  const beers = ref([
    {
      id: 1,
      name: 'Guinness',
      style: 'Stout',
      brewery: 'St. James\'s Gate Brewery',
      rating: 4.2,
      imageUrl: 'https://via.placeholder.com/150?text=Guinness',
      description: 'Классический тёмный стаут'
    },
    {
      id: 2,
      name: 'Heineken',
      style: 'Lager',
      brewery: 'Heineken Brouwerijen',
      rating: 3.8,
      imageUrl: 'https://via.placeholder.com/150?text=Heineken',
      description: 'Голландское лагер пиво'
    }
  ])

  // Добавить новое пиво
  const addBeer = (beer) => {
    const newBeer = {
      id: Math.max(...beers.value.map(b => b.id), 0) + 1,
      ...beer
    }
    beers.value.push(newBeer)
  }

  // Получить одно пиво по ID
  const getBeerById = (id) => {
    return beers.value.find(b => b.id === id)
  }

  // Удалить пиво
  const removeBeer = (id) => {
    beers.value = beers.value.filter(b => b.id !== id)
  }

  // Обновить рейтинг пива
  const updateBeerRating = (id, rating) => {
    const beer = beers.value.find(b => b.id === id)
    if (beer) {
      beer.rating = rating
    }
  }

  // Вычисляемое свойство - сортировка по рейтингу
  const beersByRating = computed(() => {
    return [...beers.value].sort((a, b) => b.rating - a.rating)
  })

  return {
    beers,
    addBeer,
    getBeerById,
    removeBeer,
    updateBeerRating,
    beersByRating
  }
})
