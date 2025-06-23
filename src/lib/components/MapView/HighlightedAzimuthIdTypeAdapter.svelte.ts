import {
	getSunAzimuthIdsByType,
	getSunAzimuthTypeById,
	type SunAzimuthTypeEnum,
	type SunAzimutIdEnum,
} from "./sectionsConfig";

/** Adapter for combining both possible highlights: azimuth type and azimuth id */
export class HighlightedAzimuthIdTypeAdapter {
	#highlightedAzimuth = $state<SunAzimutIdEnum | undefined>(undefined);
	#highlightedAzimuthType = $state<SunAzimuthTypeEnum | undefined>(undefined);

	highlightedAzimuthIds: SunAzimutIdEnum[] = $derived.by(() => {
		const ids: SunAzimutIdEnum[] = [];
		if (this.#highlightedAzimuth) {
			ids.push(this.#highlightedAzimuth);
		}
		if (this.#highlightedAzimuthType) {
			ids.push(...getSunAzimuthIdsByType(this.#highlightedAzimuthType));
		}
		return ids;
	});

	highlightedType: SunAzimuthTypeEnum | undefined = $derived.by(() => {
		if (this.#highlightedAzimuthType) {
			return this.#highlightedAzimuthType;
		}
		if (this.#highlightedAzimuth) {
			return getSunAzimuthTypeById(this.#highlightedAzimuth);
		}
		return undefined;
	});

	onHighlightedId = (id: SunAzimutIdEnum | undefined) => {
		this.#highlightedAzimuth = id;
	};

	onHighlightedType = (type: SunAzimuthTypeEnum | undefined) => {
		this.#highlightedAzimuthType = type;
	};
}
