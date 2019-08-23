# vue-rxjs-decorator

[![npm](https://img.shields.io/npm/v/vue-rxjs-decorator.svg)](https://www.npmjs.com/package/vue-rxjs-decorator)

## Install

```bash
npm i -S vue-rxjs-decorator
```

## Usage

First, you should use VueRx plugin;

```typescript
// main.ts
import VueRx from "vue-rx";

Vue.use(VueRx);
```

`@ObservableData(name: string)`

```html
<template>
  <div>{{data$}}</div>
</template>
```

```typescript
import { ObservableData } from "vue-rxjs-decorator";

@Component
export default class App extends Vue {
  @ObservableData("data$")
  _data$() {
    return observable.pipe(handle);
  }

  created() {
    // you can subscribe like this
    this.$observables.data$.subscribe();
  }
}
```

`@EventSubject()`

```html
<template>
  <button v-stream:click="{subject: streamClick, data: 1}">add</button>
  <div>{{data$}}</div>
</template>
```

```typescript
import { ObservableData, EventSubject } from "vue-rxjs-decorator";

@Component
export default class App extends Vue {
  data$!: any;

  @EventSubject()
  streamClick!: Subject<any>;

  @ObservableData("data$")
  _data$() {
    return this.streamClick.pipe(handle);
  }
}
```

`@ObservableMethod(name: string)`

```html
<template>
  <div>{{data$}}</div>
  <button @click="addHandle(100)"></button>
</template>
```

```typescript
import { ObservableData, ObservableMethod } from "vue-rxjs-decorator";

@Component
export default class App extends Vue {
  addHandle!: (n: number) => void;

  @ObservableData("data$")
  _data$() {
    return this.addHandle$.pipe(handle);
  }

  @ObservableMethod("addHandle")
  addHandle$!: Observable<number>;
}
```

## See also

[vue-rx](https://github.com/vuejs/vue-rx)
[vue-class-component](https://github.com/vuejs/vue-class-component)

## License

MIT License
