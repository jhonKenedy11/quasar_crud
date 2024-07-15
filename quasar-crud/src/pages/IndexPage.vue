<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="posts"
        :columns="columns"
        row-key="id"
      >
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{name: 'formPost'}" />

      </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)"></q-btn>
            <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

// Defina opções do componente
defineOptions({
  name: 'IndexPage'
})

// Estado reativo
const posts = ref([])
const { list, remove } = postsService()
const router = useRouter()

const columns = [
  { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left' },
  { name: 'title', field: 'title', label: 'Titulo', sortable: true, align: 'left' },
  { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
  { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
]

const $q = useQuasar()

// Função para buscar os posts
const getPosts = async () => {
  try {
    const response = await list()
    posts.value = response // Atualiza a propriedade posts com os dados da API
  } catch (error) {
    console.log(error)
  }
}

const handleDeletePost = async (id) => {
  try {
    $q.dialog({
      title: 'Deletar',
      message: 'Deseja deletar esse post?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(id)
      $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
      await getPosts()
    })
  } catch (error) {
    $q.notify({ message: 'Erro ao apagar post', icon: 'times', color: 'negative' })
  }
}

const handleEditPost = async (id) => {
  try {
    router.push({ name: 'formPost', params: { id } })
    // $q.notify({ message: 'Atualizado com sucesso', icon: 'check', color: 'positive' })
    // await getPosts()
  } catch (error) {
    $q.notify({ message: 'Erro ao atualizar post', icon: 'times', color: 'negative' })
  }
}

// Chama getPosts quando o componente é montado
onMounted(() => {
  getPosts()
})

</script>
