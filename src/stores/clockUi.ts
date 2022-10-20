import { writable } from "svelte/store";
import { ClockUiTypeEnum } from "$/models/ClockUiTypeEnum";

export const tableView = writable<boolean>(false);
export const state = writable<ClockUiTypeEnum>(ClockUiTypeEnum.default);
