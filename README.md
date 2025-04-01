# demo of Vue3 render functions using GridStack.renderCB

New demo of Vue3 render functions using GridStack.renderCB

## Benefits

- less code than using GridStack.addRemoveCB, since GridStack creates the 2 needed parent divs + classes
- more information passed to GridStack.renderCB() - (entire GridStackWidget is passed so you can use id or some other field as logic)
- less templating needed (no need for div class="grid-stack-item wrapper) in each Vue component
- fixes {{ info }} display

https://github.com/gridstack/gridstack.js/pull/2905
