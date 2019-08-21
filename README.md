# vue-rxjs-decorator

[![npm](https://img.shields.io/npm/v/vue-rxjs-decorator.svg)](https://www.npmjs.com/package/vue-rxjs-decorator)

## Install

```bash
npm i -S vue-rxjs-decorator
```

## Usage
`@ObservableData(key: string , options: ObservableDataOptions = {share: false})`


```html
<template>
  <div>{{data$}}</div>
</template>
```
```typescript
import {ObservableData} from "vue-rxjs-decorator"

@Component
export default class App extends Vue {
    data$!:any;
    
    @ObservableData("data$")
    _data$() {
        return api$({}).pipe(this.handle$())
    }
}
```

## See also

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

## License

MIT License
