import { createDecorator } from "vue-class-component";

export function ObservableData(name: string) {
  return createDecorator(function(componentOptions: any, key: string) {
    const mixin = {
      subscriptions() {
        return {
          [name]: componentOptions["methods"][key].call(this)
        };
      }
    };
    const mixins = componentOptions.mixins || [];
    mixins.push(mixin);
  });
}

export function EventSubject() {
  return createDecorator(function(componentOptions: any, key, index) {
    const mixin = {
      domStreams: [key]
    };
    const mixins = componentOptions.mixins || [];
    mixins.push(mixin);
  });
}

export function ObservableMethod(name: string) {
  return createDecorator(function(componentOptions: any, key: string) {
    const mixin = {
      observableMethods: [name]
    };
    const mixins = componentOptions.mixins || [];
    mixins.push(mixin);
  });
}
