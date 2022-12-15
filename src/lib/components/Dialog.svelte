<script lang="ts">
  import { onKbdKey } from "$lib/utils/onKbd";

  export let open = true;
  let dialogRef: HTMLDialogElement;

  function modal(el: HTMLDialogElement, open: boolean) {
    function handler(open: boolean) {
      if (open) {
        el.showModal();
      } else {
        el.close();
      }
    }
    handler(open);
    return {
      update(open: boolean) { handler(open) },
      destroy() { handler(false) },
    };
  }

  function close() {
    dialogRef.close();
  }
  const handleKeydown = onKbdKey(close, "Escape");
  function handleBackdropClick(e: MouseEvent) {
    const rect = dialogRef.getBoundingClientRect();
    const isClickOutside = !(
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (isClickOutside) {
      close();
    }
  }
</script>

<dialog
  class="dialog"
  bind:this={dialogRef}
  use:modal={open}
  on:close
  on:keydown={handleKeydown}
  on:click|self={handleBackdropClick}
>
  <button
    type="button"
    title="close"
    class="btn-close"
    on:click={close}
  >🗙</button>
  <slot />
</dialog>

<style>
  .dialog {
    background-color: var(--clr-bg-main, #FFF);
    border: 1px solid var(--clr-border, #AAA);
    box-shadow: 0 0 5px var(--clr-shadow, #00000020);
  }
  .dialog::backdrop {
    background-color: #00000020;
    backdrop-filter: blur(2px);
  }
  @media (prefers-color-scheme: dark) {
    .dialog::backdrop {
      background-color: #FFFFFF20;
    }
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