<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import Menu from "$lib/components/Menu";
	import { version } from "../../package.json";
	import "./layout.css";

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="page-container">
	{@render children()}
</div>
<Menu />

<footer>
	v{version}
</footer>

<style>
	.page-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
	footer {
		position: fixed;
		bottom: 10px;
		left: 10px;
		font-size: 0.7em;
	}
</style>
