import { ref, onMounted, onBeforeUnmount, h, render } from 'vue';
import GridItemComponent from './components/GridItemComponent.vue';
import { GridStack } from 'gridstack';
const info = ref('');
let grid = null;
const items = [
    { id: 1, x: 2, y: 1, h: 2, content: 'HOLY maccaroni' },
    { id: 2, x: 2, y: 4, w: 3, content: 'Widget 2' },
    { id: 3, x: 4, y: 2, content: 'Widget 3' },
    { id: 4, x: 3, y: 1, h: 2, content: 'Widget 4' },
    { id: 5, x: 0, y: 6, w: 2, h: 2, content: 'Widget 5' }
];
let count = ref(items.length);
const shadowDom = {};
onMounted(() => {
    grid = GridStack.init({
        float: true,
        cellHeight: '70px',
        minRow: 1
    });
    // Listen for remove events to clean up Vue renders
    grid.on('removed', function (event, items) {
        items.forEach((item) => {
            if (shadowDom[item.id]) {
                render(null, shadowDom[item.id]);
                delete shadowDom[item.id];
            }
        });
    });
    GridStack.renderCB = function (el, widget) {
        const gridItemEl = el.closest('.grid-stack-item');
        const itemId = widget.id;
        const widgetContent = widget.content;
        const widgetNode = h(GridItemComponent, {
            itemId,
            content: widgetContent,
            onRemove: () => {
                grid.removeWidget(gridItemEl);
                info.value = `Widget ${itemId} removed`;
            }
        });
        shadowDom[itemId] = el;
        render(widgetNode, el);
    };
    grid.load(items);
});
onBeforeUnmount(() => {
    Object.values(shadowDom).forEach((el) => {
        render(null, el);
    });
});
function addNewWidget() {
    const node = items[count.value] || {
        x: Math.round(12 * Math.random()),
        y: Math.round(5 * Math.random()),
        w: Math.round(1 + 3 * Math.random()),
        h: Math.round(1 + 3 * Math.random()),
        content: `Widget ${count.value + 1}`
    };
    node.id = String(count.value++);
    grid.addWidget(node);
    info.value = `Widget ${node.id} added`;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.addNewWidget) },
    type: "button",
});
(__VLS_ctx.info);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-stack" },
});
/** @type {__VLS_StyleScopedClasses['grid-stack']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            info: info,
            addNewWidget: addNewWidget,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
