<template>
    <div v-if="isVisible" class="loading-indicator-container" aria-live="polite" :aria-hidden="isVisible" aria-labelledby="indicatorText">
        <span class="fs-3 lds-dual-ring" id="indicatorText">Espere ...</span>
    </div>
</template>
<script>
    export default {
        name: "LoadingIndicator",
        props: {
            isVisible: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style scoped>
.loading-indicator-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    z-index: 50000;
    background-color: rgba(255, 255, 255, 0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    cursor: progress;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(187, 156, 223);
  border-color: rgb(141, 125, 230) transparent rgb(215, 197, 236) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>