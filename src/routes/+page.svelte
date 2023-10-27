<script lang="ts">
	import type { PageData } from "./$types";
	import Clock from "$lib/components/Clock";
	export let data: PageData;
</script>

<Clock time={data.date} />
