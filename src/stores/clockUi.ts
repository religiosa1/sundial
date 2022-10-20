import { writable } from "svelte/store";
import { ClockUiType } from "$/models/ClockUiType";


export const tableView = writable<boolean>(false);
export const state = writable<ClockUiType>(ClockUiType.default);
