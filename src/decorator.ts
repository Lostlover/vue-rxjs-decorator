import { Subscription } from "rxjs";
import { defineReactive } from "./util";
import { createDecorator } from "vue-class-component";

export const subscriptionSymbol = Symbol("subscription");

export function ObservableData<T>(key: string) {
  return function(this: any, target: any, name: string, describer: any) {
    const curKey = key || `${name}$`;
    let observable: any;

    createDecorator(function(this: any, componentOptions: any, key, index) {
      const mixins = {
        created(this: any) {
          const _this = this;

          observable = componentOptions["methods"][key].call(_this);

          defineReactive(_this, curKey, undefined);

          const s = observable.subscribe(
            (value: any) => {
              _this[curKey] = value;
              _this.$forceUpdate();
            },
            (error: any) => {
              throw error;
            }
          );

          if (!this[subscriptionSymbol]) {
            this[subscriptionSymbol] = new Subscription();
          }
          this[subscriptionSymbol].add(s);
        },
        beforeDestroy(this: any) {
          const _subscriptions: Subscription = this[subscriptionSymbol];

          if (_subscriptions) {
            _subscriptions.unsubscribe();
          }
        }
      };
      componentOptions.mixins!.push(mixins);
    })(target, name);
  };
}
