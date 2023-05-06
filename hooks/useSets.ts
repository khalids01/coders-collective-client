import { useState } from "react";

export default function useSets() {
  const [sets, setSets] = useState(new Set());

  function push(element: any) {
    setSets((sets) => {
        sets.add(element)
      return sets;
    });
  }

  function clear() {
    setSets(new Set());
  }

  function remove(value: string) {
    setSets((sets) => {
      sets.delete(value);
      return sets;
    });
  }

  return {
    sets,
    push,
    clear,
    remove,
  };
}

export type SetsType = ReturnType<typeof useSets>;
