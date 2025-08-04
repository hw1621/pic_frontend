<template>
  <div id="userRegisterPage">
    <h2 class="title">Cloud Gallery - User Login</h2>
    <div class="desc">Enterprise-level Intelligent Collaborative Cloud Gallery</div>
    <a-form
      :model="formState"
      name="basic"
      label-align="left"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item
        name="userAccount"
        :rules="[{ required: true, message: 'Please enter your account' }]"
      >
        <a-input v-model:value="formState.userAccount" placeholder="Please enter your account" />
      </a-form-item>
      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: 'Please enter password' },
          { min: 8, message: 'Password length must be longer than 8' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          placeholder="Please enter password"
        />
      </a-form-item>
      <a-form-item
        name="checkPassword"
        :rules="[
          { required: true, message: 'Please enter check password' },
          { min: 8, message: 'Confirm password length must be longer than 8' },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          placeholder="Please enter check password"
        />
      </a-form-item>
      <div class="tips">
        Already have an account？
        <RouterLink to="/user/login">Go to login</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { userRegisterUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const router = useRouter()

const handleSubmit = async (values: any) => {
  // 判断两次输入的密码是否一致
  if (formState.userPassword !== formState.checkPassword) {
    message.error('The second input password in inconsistent')
    return
  }
  const res = await userRegisterUsingPost(values)
  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success('Register Successful')
    router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('Register fail，' + res.data.message)
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
#userRegisterPage {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.desc {
  text-align: center;
  color: #bbb;
  margin-bottom: 16px;
}

.tips {
  margin-bottom: 16px;
  color: #bbb;
  font-size: 13px;
  text-align: right;
}
</style>
