<template>
  <CBreadcrumb class="d-md-down-none me-auto mb-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item"
      :href="item.active ? '' : item.path"
      :active="item.active"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
  <h6 style="margin-top: 25px; margin-left: 15px">
    <span style="font-weight: bold">usuario:</span> {{ usuario }}
  </h6>
</template>

<script>
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/store/AuthStore'

export default {
  name: 'AppBreadcrumb',
  setup() {
    const authStore = useAuthStore()
    const usuario = authStore.authInfo.user.nombre
    const breadcrumbs = ref()

    const getBreadcrumbs = () => {
      return router.currentRoute.value.matched.map((route) => {
        return {
          active: route.path === router.currentRoute.value.fullPath,
          name: route.meta.label,
          path: `${router.options.history.base}${route.path}`,
        }
      })
    }

    router.afterEach(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    onMounted(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    return {
      breadcrumbs,
      usuario,
    }
  },
}
</script>
