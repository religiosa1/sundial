<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import Menu from "$lib/components/Menu";
	import "./layout.css";

	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="content-wrap">
	<slot />
</div>
<Menu />

<style>
	.content-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
</style>
