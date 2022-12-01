<script lang="ts">
    import Menu from "$lib/components/Menu";
    import "./layout.css";
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
        height: 100vh
    }
</style>

