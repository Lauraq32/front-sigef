<template>
    <input
        type="date"
        v-model="formatDate"
        class="form-control"
    />
</template>
<script>
import { computed } from 'vue';
export default { 
  props: { 
    modelValue: String, 
  },
  setup(props, { emit }) { 
    const formatDate = computed({ 
      get: () => {
        if (typeof props.modelValue === 'string') {
            return props.modelValue;
        }

        return props.modelValue.toISOString().split('T')[0];
      }, 
      set: (value) => {
        let date = value;
        if (typeof value === 'string') {
            date = new Date(`${date}T00:00:00`);
        }
        emit('update:modelValue', date);
        emit('update:date', new Date(`${date}T00:00:00`));
      }
    });

    return { 
        formatDate, 
    } 
  }
}
</script>