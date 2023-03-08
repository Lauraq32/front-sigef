<template>
  <CToaster placement="top-end">
    <CToast
      v-for="(toast, index) in toasts"
      :color="toast.color"
      :key="index"
      :delay="toast.time ?? 6000"
    >
      <div class="d-flex flex-wrap">
        <CToastBody style="font-weight: 700">
          <span
            v-if="typeof toast.content === 'string'"
            v-html="toast.content"
          ></span>
          <div v-else-if="Array.isArray(toast.content)">
            <span
              class="d-md-block"
              v-for="(msg, i) in toast.content"
              :key="i"
              v-html="`- ${msg}`"
            ></span>
          </div>
        </CToastBody>
        <CToastClose v-if="toast.close" class="me-2 m-auto" />
      </div>
    </CToast>
  </CToaster>
</template>

<script>
export default {
  name: 'ToastStack',
  props: {
    toast: {
      type: Array,
    },
  },
}
</script>
