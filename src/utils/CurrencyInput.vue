<template>
  <input class="form-control" ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object,
  },
  setup(props) {
    const { inputRef, setValue } = useCurrencyInput(props.options)
    watch(
      () => props.modelValue,
      (value) => setValue(value)
    )

    return { inputRef }
  },
}
</script>
