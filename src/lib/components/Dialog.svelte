<script context="module" lang="ts">
	let nDialogs = 0;
</script>

<script lang="ts">
  import { onKbdKey } from "$lib/utils/onKbd";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let buttonRef: HTMLButtonElement;

  onMount(() => {
    nDialogs++;
    document.body.classList.add("dialog-opened");
    buttonRef?.focus();
    return () => {
      nDialogs--;
      if (nDialogs <= 0) {
        document.body.classList.remove("dialog-opened")
      }
    }
  });

  function onClose() {
    dispatch("close");
  }

  const handleKeydown = onKbdKey(() => { onClose() }, "Escape");
</script>


<div
  tabindex="-1"
  class="dialog-backdrop"
  on:click|self={onClose}
  on:keydown={handleKeydown}
>
  <dialog
    class="dialog"
    open
    on:close
  >
    <button
      type="button"
      title="close"
      class="btn-close"
      bind:this={buttonRef}
      on:click={onClose}
    >🗙</button>
    <slot />
  </dialog>
</div>

<style>
  .dialog {
    border: 1px solid gray;
    box-shadow: 0 0 5px rgba(0, 0, 10, 0.25);
  }
  .dialog-backdrop {
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 10, 0.05);
    backdrop-filter: blur(2px);
    display: flex;
    place-items: center center;
  }
  .btn-close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    margin: 0;
    border: 0;
    padding: 0;
    background: none;
    line-height: 1;
  }
</style>