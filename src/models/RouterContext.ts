import type { Writable } from "svelte/store";

export interface RouterContext {
  currentRoute: Writable<string>;
}