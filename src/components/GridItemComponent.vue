<template>
  <div class="grid-item">
    <button class="remove-btn" @click="handleRemove">X</button>
    <div class="content">
      <p>Vue Grid Item {{ itemId }}</p>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
import { toRefs, onBeforeUnmount } from 'vue'

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  },
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['remove'])
const { itemId } = toRefs(props)

onBeforeUnmount(() => {
  console.log(`In vue onBeforeUnmount for item ${itemId.value}`)
})

function handleRemove() {
  emit('remove')
}
</script>

<style>
.grid-stack-item-content {
  background-color: #663333 !important;
  color: #afafaf;
  padding: 1rem;
  position: relative;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #afafaf;
}

.remove-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.content {
  margin-top: 1.5rem;
}

.content p {
  margin: 0.5rem 0;
}
</style>