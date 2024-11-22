<script lang="ts">
	import { format, isValid } from "date-fns";

	interface Props {
		value: Date | undefined;
		fallback?: string;
		format?: string;
	}

	const { value, fallback = "--/--", format: fmt = "H:mm:ss" }: Props = $props();
</script>

{#if isValid(value)}
	<time datetime={format(value!, "HH:mm:ss")}>
		{format(value!, fmt)}
	</time>
{:else}
	{fallback}
{/if}
