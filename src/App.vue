<template>
  <main>
    <button type="button" @click="addNewWidget">Add Widget</button>
    {{ info }}
    <div class="grid-stack"></div>
  </main>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, h, render} from 'vue'
import GridItemComponent from './components/GridItemComponent.vue'
import {GridStack} from 'gridstack'


import {useDashbordStore} from "@/useDashboardStore.js"

const store = useDashbordStore()
const info = ref('')
let grid = null

const items = store.items
console.log(items)
let count = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 0
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
        store.removeItem(item.id)
      }
    })
  })

  grid.on('change', function (event, items) {
    items.forEach((item) => {
      store.updateItem({
        id: item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        content: item.content
      })
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
  info.value = `${items.length} widgets loaded`
  store.saveItems(items)
})

onBeforeUnmount(() => {
  Object.values(shadowDom).forEach((el) => {
    render(null, el)
  })
})

function addNewWidget() {
  const node = {
    x: Math.round(12 * Math.random()),
    y: Math.round(5 * Math.random()),
    w: Math.round(1 + 3 * Math.random()),
    h: Math.round(1 + 3 * Math.random()),
    content: `Widget ${count}`
  }
  console.log('', count)
  node.id = String(count)
  grid.addWidget(node)
  info.value = `Widget ${node.id} added`
  store.addItem(node)
  count++
}
</script>

<style>
@import 'assets/demo.css';
</style>