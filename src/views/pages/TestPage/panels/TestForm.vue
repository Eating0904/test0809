<template lang="pug">
.panelContent
  .contentWrapper
    el-form.contentInner(
      ref="editForm"
      :label-position="labelPosition"
      :model='formData'
      :rules='rules'
      label-width='100px'
    )
      el-form-item(prop="domain_name" label='名稱')
        el-input(v-model='formData.domain_name')
      el-form-item(label='描述')
        el-input(v-model='formData.description')
  .buttonWrapper
    el-button(
      type="danger"
      @click="closePanel"
    ) 取消
    el-button(
      type="success"
      @click="checkValidate"
    ) 儲存
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import domainApi from '@api/domain'
import { getRules } from 'app-plugin/mixins/panelsMixin'

export default {
  name: 'TestForm',
  props: {
    configProps: {
      type: Object,
      default: null,
    },
  },
  setup(props, {emit}) {
    const { id, action } = props.configProps ?? null
    const labelPosition = ref('top')
    const editForm = ref(null)
  
    const formData = reactive({
      domain_name: '',
      description: '',
    })

    const rules = getRules(formData)

    const checkValidate = () => {
      editForm.value.validate((valid) => {
        if (valid) {
          submitWhenValidate()
        }
      })
    }

    const submitWhenValidate = async () => {
      const api = (action === 'edit') ? domainApi.updatePartOf : domainApi.create;
      const message = (action === 'edit') ? '編輯成功' : '新增成功';
      const params = (action === 'edit') ? [id, formData] : [formData];

      try {
        await api(...params)
        ElMessage({
          type: 'success',
          message,
        })
        closePanel()
        emit('eventEmit', { name: 'refresh-page' })
      } catch  {
        // pass
      }
    }

    const closePanel = () => {
      emit('close')
    }

    const getItemById = async () => {
      const res = await domainApi.getItemById(id)
      formData.domain_name = res.domain_name
      formData.description = res.description
    }
  
    onMounted(async () => {
      // 有id表示已經有資料，為編輯模式
      if (id) {
        await getItemById()
      }
    })

    return {
      labelPosition,
      formData,
      closePanel,
      checkValidate,
      rules,
      submitWhenValidate,
      editForm,
    }
  },
}
</script>
