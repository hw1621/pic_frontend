<template>
  <div id="userManagePage">
    <!-- Search -->
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="Account">
        <a-input v-model:value="searchParams.userAccount" placeholder="Enter account" allow-clear/>
      </a-form-item>
      <a-form-item label="Username">
        <a-input v-model:value="searchParams.userName" placeholder="Enter username" allow-clear/>
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
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">Admin</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">User</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button danger @click="doDelete(record.id)">Delete</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteUserUsingPost, listUserVoByPageUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Account',
    dataIndex: 'userAccount',
  },
  {
    title: 'Username',
    dataIndex: 'userName',
  },
  {
    title: 'Avatar',
    dataIndex: 'userAvatar',
  },
  {
    title: 'Profile',
    dataIndex: 'userProfile',
  },
  {
    title: 'UserRole',
    dataIndex: 'userRole',
  },
  {
    title: 'Creation Time',
    dataIndex: 'createTime',
  },
  {
    title: 'Operation',
    key: 'action',
  },
]

const dataList = ref<API.UserVO[]>([])
const total = ref(0)

const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
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
  const res = await deleteUserUsingPost({ id })
  if (res.data.code === 0) {
    message.success("Delete success")
    fetchData()
  } else {
    message.error("Delete fail")
  }
}

const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({
    ...searchParams,
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('Fetch user data fail: ' + res.data.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>
