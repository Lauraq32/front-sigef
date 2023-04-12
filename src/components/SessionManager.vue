<template >
  <v-idle @idle="handleIdle" :duration="300" :loop="false" />
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useAuthStore } from "@/store/AuthStore"
import { mapActions } from 'pinia'
import router from '@/router/index'
export default {
  name: "SessionManager",
  methods: {
    ...mapActions(useAuthStore, ["signOut"]),

    handleIdle() {

      this.signOut().then(() => {

        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Su sesión ha expirado',
          showConfirmButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then(() => {
          router.push({ name: "Login", replace: true })
        })
      })
    }
  }
}

</script>

<style>
.v-idle {
  display: none;
}
</style>
