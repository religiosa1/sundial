<script lang="ts">
	import { format } from "date-fns";

	interface Props {
		date: Date;
		time: Date;
		compact?: boolean;
	}
	const { date, time, compact }: Props = $props();
</script>

<div class="time-display" class:compact>
	<time class="selectedDate" datetime={format(date, "yyyy-MM-dd")}>
		{format(date, "dd.MM.yyyy")}
	</time>
	<time class="currentTime" datetime={format(time, "HH:mm")}>
		{format(time, "H:mm")}
	</time>
</div>

<style>
	.selectedDate,
	.currentTime {
		display: block;
	}
	.compact .selectedDate,
	.compact .currentTime {
		display: inline;
	}
	.currentTime {
		font-size: 3em;
		line-height: 1;
	}
	.compact .currentTime {
		font-size: 1em;
	}
</style>
