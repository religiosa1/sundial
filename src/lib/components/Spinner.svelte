<script lang="ts">
	interface Props {
		title?: string;
	}
	let { title }: Props = $props();
</script>

<span class="spinner" {title}></span>

<style>
	.spinner {
		display: inline-block;
		width: 1.2em;
		height: 1.2em;
		vertical-align: middle;
		margin: 0 0.2em;
		background: url("/img/spinner.svg") no-repeat center / contain;
		@supports (mask: none) {
			background: currentColor;
			mask: url("/img/spinner.svg") no-repeat center / contain;
		}
	}
</style>
