<script lang="ts">
	import { format } from "date-fns";

	interface Props {
		date: Date;
		time: Date;
	}
	const { date, time }: Props = $props();
</script>

<time class="selectedDate" datetime={format(date, "yyyy-MM-dd")}>
	{format(date, "dd.MM.yyyy")}
</time>
<time class="currentTime" datetime={format(time, "HH:mm")}>
	{format(time, "H:mm")}
</time>

<style>
	.selectedDate,
	.currentTime {
		display: block;
	}
	.currentTime {
		font-size: 3em;
		line-height: 1;
	}
</style>
