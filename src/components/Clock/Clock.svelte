<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import Dial from "./Dial/Dial.svelte";
  import SectionInfo from "./SectionInfo.svelte";
  import PlaceTimeInfo from "./PlaceTimeInfo.svelte";

  import { timeToDeg } from "$/utils/timeToDeg";
  import { onKbdCode } from "$/utils/onKbd";

  let time = new Date();

  let rotated = true;
  $: rotationStyles = getRotationStyles(rotated);

  function getRotationStyles(rotated) {
    if (rotated) return `transform: rotate(-${timeToDeg(time)}deg)`
    return "";
  }

  function toggleRotation() {
    rotated = !rotated;
  }

  $: section = null;
  function updateSectionInfo(e) {
    if (e && e.detail) {
      section = e.detail;
    }
    else {
      section = null;
    }
  }

  onMount(()=>{
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


</script>


<div class="clock" transition:slide="{{ duration: 300, easing: quintOut }}">
  <div class="top-marker" class:top-marker-visible={rotated}></div>
  <button class="dial-wrapper"
    type="button"
    on:click={toggleRotation}
    on:keydown={onKbdCode(toggleRotation, ["Space", "Enter", "NumpadEnter"])}
  >
    <div class="dial-rotater" style={rotationStyles}>
      <Dial on:sectionHover={updateSectionInfo} />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="dial-overlay" on:click|stopPropagation>
      <slot></slot>
    </div>
  </button>
  <SectionInfo {section} />
  <PlaceTimeInfo />
</div>

<style>
  .dial-wrapper,
  .dial-rotater {
    display: block;
    border: 0;
    margin: 0 auto;
    padding: 0;
    border-radius: 50%;
    width: 85vmin;
    max-height: 85vmin;
  }
  .dial-wrapper {
    position: relative;
    margin: auto;
    overflow: hidden;
  }
  .dial-rotater { transition: transform 0.4s ease; }
  .dial-overlay {
    position: absolute;
    top: 20%;
    bottom: 20%;
    left:20%;
    right: 20%;
    margin: auto;
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 3vmin;
  }
  .top-marker {
    width: 0.8vmin;
    height: 0.8vmin;
    border: 2px solid black;
    border-top: 0;
    border-left: 0;
    margin: 0 auto 0.8vmin;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .top-marker-visible {
    opacity: 1;
  }
</style>
