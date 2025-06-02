export const AppRouteEnum = {
	dialView: "/",
	tableView: "/table",
	yearlyView: "/yearly",
	mapView: "/angles",
} as const;
export type AppRouteEnum = (typeof AppRouteEnum)[keyof typeof AppRouteEnum];
export const routeList = Object.values(AppRouteEnum);
