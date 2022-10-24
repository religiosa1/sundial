import { writable } from "svelte/store";
import { ClockUiTypeEnum } from "$/models/ClockUiTypeEnum";
import { AppRouteEnum } from "$/routes";

export const currentRoute = writable<AppRouteEnum>(AppRouteEnum.dialView);
export const state = writable<ClockUiTypeEnum>(ClockUiTypeEnum.default);
