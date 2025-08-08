<template>
  <div id="addPicturePage">
    <h2 style="margin-bottom: 16px">Create Picture</h2>
    <PictureUpload :picture="picture" :onSuccess="onSuccess" />
    <a-form v-if="picture" layout="vertical" :model="pictureForm" @finish="handleSubmit">
      <a-form-item label="name" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="Please enter name" />
      </a-form-item>
      <a-form-item label="introduction" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="Please enter introduction"
          :rows="2"
          autoSize
          allowClear
        />
      </a-form-item>
      <a-form-item label="category" name="category">
        <a-auto-complete v-model:value="pictureForm.category" placeholder="Please enter category" allowClear />
      </a-form-item>
      <a-form-item label="tags" name="tags">
        <a-select
          v-model:value="pictureForm.tags"
          mode="tags"
          placeholder="Please enter tags"
          allowClear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">Create</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { onMounted, reactive, ref } from 'vue'
import { editPictureUsingPost, listPictureTagCategoryUsingGet } from '@/api/pictureController.ts'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const picture = ref<API.PictureVO>()
const pictureForm = reactive<API.PictureEditRequest>({})
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
}

const handleSubmit = async (value: any) => {
  const pictureId = picture.value.id
  if (!pictureId) {
    return
  }

  const res = await editPictureUsingPost({
    id: pictureId,
    ...value,
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('Create success')
    router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('Create fail ' + res.data.message)
  }
}

const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    // 转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('Load options fail，' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

</script>
