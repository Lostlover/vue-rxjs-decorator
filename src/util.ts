import Vue from "vue";

export function defineReactive(vm: any, key: string, val: any) {
  if (key in vm) {
    vm[key] = val;
  } else {
    (Vue as any).util.defineReactive(vm, key, val);
  }
}
