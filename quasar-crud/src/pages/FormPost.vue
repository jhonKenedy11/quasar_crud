<template>
  <q-page padding>
    <q-form
      @submit.prevent="onSubmit"
      class="row q-col-gutter-sm"
    >
      <q-input
        rounded filled
        v-model="form.title"
        label="Titulo"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"
      />

      <q-input
        rounded filled
        v-model="form.author"
        label="Autor"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"
      />

      <div class="col-lg-12 col-xs-12">
        <q-editor v-model="form.content" min-height="5rem" />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" type="submit" color="primary" class="float-right" icon="save"/>
        <q-btn label="Cancelar" color="white" text-color="primary" class="float-right" :to="{ name: 'home'}"/>
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { defineOptions, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'formPost'
})

const $q = useQuasar()
// CLASSE POST
const { post, getById, update } = postsService()
// CLASSE ROTAS GERAIS
const router = useRouter()
// CLASSE DADOS DA ROTA ATUAL
const route = useRoute()

const form = ref({
  title: '',
  content: '',
  author: ''
})

onMounted(async () => {
  if (route.params.id) {
    getPosts(route.params.id)
  }
  // console.log(route.params.id)
})

const getPosts = async (id) => {
  try {
    const response = await getById(id)
    form.value = response
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = async () => {
  try {
    if (form.value.id) {
      await update(form.value)
    } else {
      await post(form.value)
    }

    $q.notify({ message: 'Post salvo com sucesso', icon: 'check', color: 'positive' })
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}

</script>
