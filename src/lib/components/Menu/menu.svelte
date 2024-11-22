<script lang="ts">
	import { page } from "$app/stores";
	import { AppRouteEnum } from "$lib/models/AppRouteEnum";

	import DateForm from "./DateForm.svelte";
	import PlaceForm from "./PlaceForm.svelte";

	let showDateForm = $state(false);
	let showPlaceForm = $state(false);
</script>

<aside class="menu">
	<nav class="menu__nav">
		<a
			href={AppRouteEnum.dialView}
			class="menu__button display-type display-type_dial"
			class:active={$page.url.pathname === AppRouteEnum.dialView}
			title="dial view"
			aria-label="dial view"
		>
			dial view
		</a>

		<a
			href={AppRouteEnum.tableView}
			class="menu__button display-type display-type_table"
			class:active={$page.url.pathname === AppRouteEnum.tableView}
			title="table view"
			aria-label="table view"
		>
			table view
		</a>

		<a
			href={AppRouteEnum.yearlyView}
			class="menu__button display-type display-type_yearly"
			class:active={$page.url.pathname === AppRouteEnum.yearlyView}
			title="yearly view"
			aria-label="yearly view"
		>
			yearly view
		</a>
	</nav>
	<div class="controls">
		<button
			type="button"
			class="menu__button placeform"
			class:active={showPlaceForm}
			title="place"
			onclick={() => (showPlaceForm = !showPlaceForm)}
		>
			location settings
		</button>
		<button
			type="button"
			class="menu__button dateform"
			class:active={showDateForm}
			title="date"
			onclick={() => (showDateForm = !showDateForm)}
		>
			date settings
		</button>
	</div>
</aside>

{#if showPlaceForm}
	<PlaceForm bind:open={showPlaceForm} />
{/if}

{#if showDateForm}
	<DateForm bind:open={showDateForm} />
{/if}

<style>
	.menu {
		position: absolute;
		top: 10px;
		bottom: 10px;
		right: 30px;
		background: transparent;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
	}
	.menu__nav,
	.controls {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
		margin: 0 0 10px;
	}
	.menu__button {
		display: block;
		width: 50px;
		height: 50px;
		margin: 0;
		padding: 0;
		border: 1px solid #888;
		border-radius: 50%;
		font-size: 0;
		background: #eee;
		box-shadow: 0 0 20px #ccc inset;
		transition: 0.25s ease-in-out;
		transition-property: background-color, border-color;
		outline: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.menu__button:focus-visible {
		border-color: #88f;
	}

	.menu__button::after {
		width: 100%;
		height: 100%;
		background: no-repeat center center / 65% auto;
		content: "";
	}

	.menu__button:active {
		transform: translate(1px, 1px);
	}
	.menu__button.active {
		background-color: #999;
	}

	.display-type_table::after {
		background-image: url("/img/table.svg");
	}
	.display-type_dial::after {
		background-image: url("/img/dial.svg");
	}
	.display-type_yearly::after {
		background-image: url("/img/yearly-view.svg");
	}

	.placeform::after {
		background-image: url("/img/globe.svg");
	}
	.dateform::after {
		background-image: url("/img/calendar.svg");
	}
	@media (prefers-color-scheme: dark) {
		.menu__button {
			background-color: #0e0e0e;
			box-shadow: 0 0 20px #2e2e2e inset;
		}
		.menu__button::after {
			filter: invert(1) brightness(0.9);
		}
	}
	@media (max-width: 700px) {
		.menu {
			top: auto;
			position: static;
		}
		.menu__nav {
			position: fixed;
			top: 10px;
			right: 10px;
			left: 10px;
			flex-direction: row;
			gap: 25px;
			justify-content: space-around;
			justify-content: space-evenly;
		}
		.menu__button {
			width: 40px;
			height: 40px;
		}

		.controls {
			position: fixed;
			bottom: 10px;
			left: 10px;
			right: 10px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			justify-content: space-evenly;
		}
	}
</style>
