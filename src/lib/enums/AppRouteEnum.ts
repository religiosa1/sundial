export const AppRouteEnum = {
	dialView: "/",
	tableView: "/table",
	yearlyView: "/yearly",
	mapView: "/map-view",
} as const;
export type AppRouteEnum = (typeof AppRouteEnum)[keyof typeof AppRouteEnum];
export const routeList = Object.values(AppRouteEnum);
