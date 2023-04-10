<template>
  <div :id="'file-uploader-' + id" v-if="addFileButton" class="p-2">
    <label class="file-select">
      <!-- <div class="select-button">
        
        <CIcon :icon="cilLightbulb" style="color: #f5f5f5" size="m" />
      </div> -->
      <div class="row">
        <div class="col-3">
          <div class="select-button">
            <CIcon icon="cilCloudUpload" size="lg" />
          </div>
        </div>
        <div class="col-9">
          <h5 style="font-size: 16px; margin-top: 8px;">{{ cambiar ? fileName : nombres }}</h5>
        </div>
      </div>

      <input type="file" id="formFile" @change="onFileChange" />
    </label>
    <label v-if="fileName"> {{ fileName }}</label>
  </div>
</template>
<script>
import { cilCloudUpload } from '@coreui/icons-pro'
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'

export default {
  CIcon,
  icon,
  cilCloudUpload,
  props: {
    nombres: null,
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
.file-select>.select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: left;
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