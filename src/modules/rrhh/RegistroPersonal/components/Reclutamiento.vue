<template>
  <h1>Reclutamiento</h1>
</template>
<script>

import { CSmartTable } from '@coreui/vue-pro'
  export default {
    components: {
      CSmartTable
    },
    data: () => {
      return {
        validatedCustom01: null,
      lgDemo: false,
        columns: [
          { key: 'nombre', _style: { width: '40%'} },
          'email',
         
          {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
            // _props: { color: 'primary', class: 'fw-semibold'}
          }
        ],
        details: [],
       
      }
    },
    methods: {
      handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
      getBadge (status) {
        switch (status) {
          case 'Active': return 'success'
          case 'Inactive': return 'secondary'
          case 'Pending': return 'warning'
          case 'Banned': return 'danger'
          default: 'primary'
        }
      },
      toggleDetails (item) {
        if (this.details.includes(item._id)) {
          this.details = this.details.filter((_item) => _item !== item._id)
          return
        }
        this.details.push(item._id)
      }
    },
    mounted(){
      this.$store.dispatch('AdministrativoModule/getUsuarios')
    }
    
   
  }
</script>