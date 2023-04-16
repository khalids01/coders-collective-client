import { useState } from "react";

export default function useArray(defaultValue: any[]) {
  const [array, setArray] = useState(defaultValue);

  function push(element: any) {
    setArray((a) => [...a, element]);
  }

  function pushFlattenArray(element: any[]){
    setArray((a) => [...a, ...element]);
  }

  function filter(callback: () => []) {
    setArray((a) => a.filter(callback));
  }

  function clear() {
    setArray([]);
  }

  function removeByIndex(index: number) {
    setArray((a) => a.filter((_, i) => i !== index));
  }

  function removeByObjectKey(key: string) {
    setArray((a) =>
      a.filter((elem) => Object.keys(elem).map((k) => k !== key))
    );
  }

  return {
    array,
    setArray,
    push,
    pushFlattenArray,
    filter,
    clear,
    removeByIndex,
    removeByObjectKey
  };
}
