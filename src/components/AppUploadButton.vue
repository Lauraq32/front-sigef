<template>
  <div :id="'file-uploader-' + id" v-if="addFileButton" class="p-2">
    <label class="file-select">
      <div class="row">
        <div class="col-3">
          <div class="select-button">
            <CIcon icon="cilCloudUpload" size="lg"  />
          </div>
        </div>
      </div>
      <input type="file" id="formFile" @change="onFileChange" />
      <span class="ms-2">{{ title }}</span>
    </label>
  </div>
</template>
<script>
import { cilCloudUpload } from '@coreui/icons-pro'
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'

export default {
  props: {
    title: {
      type: String,
      default:null
    },
    id: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      cambiar: false,
      fileName: null,
      addFileButton: true
    }
  },
  methods: {
    onFileChange(event) {
      this.cambiar = true
      this.fileName = event.target.files[0].name
    }
  }
}

</script>
<style scoped>
.file-select {
  display: flex;
}
.file-select > .select-button {
  padding: 1.75rem;
  line-height: 3.75;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1021;
}

.file-select>input[type='file'] {
  display: none;
}
</style>