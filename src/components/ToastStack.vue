<template>
  <CToaster placement="top-end">
    <CToast
      v-for="toast in messages"
      :color="toast.color"
      :key="toast.id"
      :index="toast.id"
      :delay="toast.time ?? 15_000"
      :visible="true"
      @close="toastStore.removeMessage(toast.id)"
    >
      <div class="d-flex flex-row justify-content-between">
        <CToastBody :class="{'text-white': toast.color === 'danger', [toast.class]: true}">
          <span
            v-if="(typeof toast.content === 'string' || typeof toast.content.message === 'string') && (toast.content?.errors ?? []).length === 0"
            v-html="toast.content.message ?? toast.content"
          ></span>
          <div v-else-if="Array.isArray(toast.content)">
            <span
              class="d-md-block"
              v-for="(msg, i) in toast.content"
              :key="i"
              v-html="`- ${msg.message || msg}`"
            ></span>
          </div>
          <div v-else-if="Array.isArray(toast.content.errors)">
            <span
              class="d-md-block"
              v-for="(msg, i) in toast.content.errors"
              :key="i"
              v-html="`- ${msg.message || msg}`"
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
    const messages = computed(() => {
      console.log("changed", toastStore.messages)
      return toastStore.messages;
    })

    return {
      toastStore,
      messages,
    }
  },
}
</script>

<style></style>
