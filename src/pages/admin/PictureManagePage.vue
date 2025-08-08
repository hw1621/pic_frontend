<template>
  <div id="pictureManagePage">
    <!-- Search -->
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="keywords">
        <a-input
          v-model:value="searchParams.searchText"
          placeholder="Keywords"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="category">
        <a-input v-model:value="searchParams.category" placeholder="Category" allow-clear />
      </a-form-item>
      <a-form-item label="tags">
        <a-select
          v-model:value="searchParams.tags"
          mode="tags"
          placeholder="Tags"
          style="min-width: 180px"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Search</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 16px" />
    <!-- Table -->
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @click="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'url'">
          <a-image :src="record.url" :width="120" />
        </template>
        <!-- tags -->
        <template v-if="column.dataIndex === 'tags'">
          <a-space wrap>
            <a-tag v-for="tag in JSON.parse(record.tags || '[]')" :key="tag">{{ tag }}</a-tag>
          </a-space>
        </template>
        <!-- picture info -->
        <template v-if="column.dataIndex === 'picInfo'">
          <div>Format：{{ record.picFormat }}</div>
          <div>Width：{{ record.picWidth }}</div>
          <div>Height：{{ record.picHeight }}</div>
          <div>Scale：{{ record.picScale }}</div>
          <div>Size：{{ (record.picSize / 1024).toFixed(2) }}KB</div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.dataIndex === 'editTime'">
          {{ dayjs(record.editTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" danger @click="doDelete(record.id)">Delete</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { deletePictureUsingPost, listPictureByPageUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: 'Picture',
    dataIndex: 'url',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Introduction',
    dataIndex: 'introduction',
    ellipsis: true,
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
  },
  {
    title: 'PicInfo',
    dataIndex: 'picInfo',
  },
  {
    title: 'User id',
    dataIndex: 'userId',
    width: 80,
  },
  {
    title: 'CreateTime',
    dataIndex: 'createTime',
  },
  {
    title: 'EditTime',
    dataIndex: 'editTime',
  },
  {
    title: 'Action',
    key: 'action',
  },
]

const dataList = ref<API.Picture[]>([])
const total = ref(0)

const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend',
})

const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total) => `total: ${total}`,
  }
})

const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

const doSearch = () => {
  searchParams.current = 1
  fetchData()
}

const doDelete = async (id: number) => {
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 0) {
    message.success('Delete success')
    fetchData()
  } else {
    message.error('Delete fail')
  }
}

const fetchData = async () => {
  const res = await listPictureByPageUsingPost({
    ...searchParams,
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('Fetch picture data fail: ' + res.data.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>
