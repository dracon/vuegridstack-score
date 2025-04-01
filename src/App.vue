<template>
  <main>
    <button type="button" @click="addNewWidget">Add Widget</button> {{ info }}
    <div class="grid-stack"></div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, h, render } from 'vue'
import GridItemComponent from './components/GridItemComponent.vue'
import { GridStack } from 'gridstack'

const info = ref('')
let grid = null
const items = [
  { "id": 1, "x": 0, "y": 0, "w": 4, "h": 2, "content": "HOLY maccaroni" }, 
  { "id": 2, "x": 4, "y": 0, "w": 6, "h": 2, "content": "Widget 2" }, 
  { "id": 3, "x": 4, "y": 2, "w": 2, "h": 2, "content": "Widget 3" }, 
  { "id": 4, "x": 0, "y": 2, "w": 3, "h": 4, "content": "Widget 4" }, 
  { "id": 5, "x": 6, "y": 2, "w": 6, "h": 2, "content": "Widget 5" }
]






let count = ref(items.length)
const shadowDom = {}

onMounted(() => {
  grid = GridStack.init({
    float: true,
    cellHeight: '70px',
    minRow: 1
  })

  // Listen for remove events to clean up Vue renders
  grid.on('removed', function (event, items) {
    items.forEach((item) => {
      if (shadowDom[item.id]) {
        render(null, shadowDom[item.id])
        delete shadowDom[item.id]
      }
    })
  })

  GridStack.renderCB = function (el, widget) {
    const gridItemEl = el.closest('.grid-stack-item')
    const itemId = widget.id
    const widgetContent = widget.content

    const widgetNode = h(GridItemComponent, {
      itemId,
      content: widgetContent,
      onRemove: () => {
        grid.removeWidget(gridItemEl)
        info.value = `Widget ${itemId} removed`
      }
    })

    shadowDom[itemId] = el
    render(widgetNode, el)
  }

  grid.load(items)
})

onBeforeUnmount(() => {
  Object.values(shadowDom).forEach((el) => {
    render(null, el)
  })
})

function addNewWidget() {
  const node = items[count.value] || {
    x: Math.round(12 * Math.random()),
    y: Math.round(5 * Math.random()),
    w: Math.round(1 + 3 * Math.random()),
    h: Math.round(1 + 3 * Math.random()),
    content: `Widget ${count.value + 1}`
  }
  node.id = String(count.value++)
  grid.addWidget(node)
  info.value = `Widget ${node.id} added`
}
</script>

<style>
@import 'assets/demo.css';
</style>