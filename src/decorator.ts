import { defer, Subscription } from "rxjs";
import { defineReactive } from "./util";
import { share, tap } from "rxjs/operators";

export const subscriptionSymbol = Symbol("subscription");

export interface ObservableDataOptions {
  share: boolean;
}

export function ObservableData<T>(
  key: string,
  options: ObservableDataOptions = { share: false }
) {
  return function(target: any, name: string, describer: any) {
    const curKey = key || `${name}$`;
    const created = target.created;
    const beforeDestroy = target.beforeDestroy;
    const fn = describer.value;
    let observable: any;

    if (options.share) {
      observable = defer(() => fn()).pipe(share());
      describer.value = function() {
        return observable;
      };
    } else {
      observable = defer(() => fn());
    }

    target.created = function() {
      const context = this;

      defineReactive(context, curKey, undefined);

      const s = observable.subscribe(
        (value: any) => {
          context[curKey] = value;
        },
        (error: any) => {
          throw error;
        }
      );

      if (!context[subscriptionSymbol]) {
        context[subscriptionSymbol] = new Subscription();
      }
      context[subscriptionSymbol].add(s);

      typeof created === "function" && created.call(context);
    };

    target.beforeDestroy = function() {
      const context = this;
      context[subscriptionSymbol].unsubscribe();

      typeof beforeDestroy === "function" && beforeDestroy.call(context);
    };
  };
}
