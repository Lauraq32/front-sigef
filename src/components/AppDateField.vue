<template>
  <input :type="typeId" v-model="formattedDate" />
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: Date,
  typeId: {
    type: String,
    default: 'date'
  }
});
const emit = defineEmits(['update:modelValue', 'dateISO']);

const formattedDate = computed({
  get: () => {
    const _date = props.modelValue === 'string' ? props.modelValue : toISO(props.modelValue);
    if (props.typeId === 'datetime-local') {
      return _date.substring(0, 16);
    }
    if (props.typeId === 'time') {
      return _date.split('T')[1].substring(0, 5);
    }

    return _date.split('T')[0];
  },
  set: (value) => {
    let date;
    if (props.typeId === 'datetime-local') {
      date = new Date(`${value}:00`);
    }
    if (props.typeId === 'time') {
      date = new Date(`0000-01-01T${value}:00`);
    }
    if (props.typeId === 'date') {
      date = new Date(`${value}T00:00:00`);
    }

    emit('update:modelValue', date);
    emit('dateISO', toISO(date));
  }
});

function toISO(date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  const time = `${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;
  return `${date.getFullYear().toString().padStart(4, 0)}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${(date.getDate()).toString().padStart(2, 0)}T${time}`;
}
</script>
