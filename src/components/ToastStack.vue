<template>
  <CToaster placement="top-end">
    <CToast
      v-for="toast in messages"
      :color="toast.color"
      :key="toast.id"
      :delay="toast.time ?? 60000"
      @close="toastStore.removeMessage(toast.id)"
    >
      <div class="d-flex flex-wrap">
        <CToastBody style="font-weight: 700">
          <span
            :class="toast.class"
            v-if="typeof toast.content === 'string'"
            v-html="toast.content"
          ></span>
          <div v-else-if="Array.isArray(toast.content)">
            <span
              class="d-md-block"
              v-for="(msg, i) in toast.content"
              :key="i"
              v-html="`- ${msg.message}`"
            ></span>
          </div>
        </CToastBody>
        <CToastClose v-if="toast.closable" class="me-2 m-auto" />
      </div>
    </CToast>
  </CToaster>
</template>
<script>
import { useToastStore } from '@/store/toast'
import { computed } from 'vue'
export default {
  name: 'ToastStack',
  setup() {
    const toastStore = useToastStore()
    const messages = computed(() => toastStore.messages)
    return {
      toastStore,
      messages,
    }
  },
}
</script>

<style></style>
