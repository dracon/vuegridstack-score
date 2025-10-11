import {defineStore} from "pinia";
import {reactive, ref} from "vue";

interface Item {
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;
    content: string;
}

type Items = Item[]

const STORAGE_KEY = 'dashboard-items'

function loadItems(): Items {
    const storedItems = localStorage.getItem(STORAGE_KEY)
    return storedItems ? JSON.parse(storedItems) : [
        {"id": 1, "x": 0, "y": 0, "w": 4, "h": 2, "content": "HOLY maccaroni"},
        {"id": 2, "x": 4, "y": 0, "w": 6, "h": 2, "content": "Widget 2"},
        {"id": 3, "x": 4, "y": 2, "w": 2, "h": 2, "content": "Widget 3"},
        {"id": 4, "x": 0, "y": 2, "w": 3, "h": 4, "content": "Widget 4"},
        {"id": 5, "x": 6, "y": 2, "w": 6, "h": 2, "content": "Widget 5"}
    ]
}

function saveItems(items: Items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const useDashbordStore = defineStore('dashbord', () => {
    let items = reactive(loadItems())

    function addItem(item: Item) {
        const serializableItem = {
            id: item.id,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            content: item.content
        }
        items.push(serializableItem)
        saveItems(items)
    }

    function removeItem(itemId: number) {
        const index = items.findIndex(item => item.id === itemId)
        if (index !== -1) {
            items.splice(index, 1)
            saveItems(items)
        }
    }

    // Add this to your store
    function updateItem(updated: Item) {
        const index = items.findIndex(item => item.id === updated.id)
        if (index !== -1) {
            items[index].x = updated.x
            items[index].y = updated.y
            items[index].w = updated.w
            items[index].h = updated.h
            saveItems(items)
            console.info(items)
        }
    }

    // Update your return statement
    return {items, loadItems, addItem, removeItem, updateItem, saveItems}

})

export {useDashbordStore, Items, Item}