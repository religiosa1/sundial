export type WebGLSupportStatusType = "supported" | "disabled" | "unsupported";

// @see https://maplibre.org/maplibre-gl-js/docs/examples/check-for-support/
export const webGLSupportStatus = ((): WebGLSupportStatusType => {
	if (!window.WebGLRenderingContext) {
		return "unsupported";
	}
	const canvas = document.createElement("canvas");
	try {
		// Note that { failIfMajorPerformanceCaveat: true } can be passed as a second argument
		// to canvas.getContext(), causing the check to fail if hardware rendering is not available. See
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
		// for more details.
		const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
		if (typeof context?.getParameter === "function") {
			return "supported";
		} else {
			return "unsupported";
		}
	} catch {
		return "disabled";
	}
})();
