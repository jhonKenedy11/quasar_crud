const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },

      /* :id? PARAMETRO QUE INFORMA QUE O CAMPO É OPCIONAL POIS È A MES LOGICA PARA O CREATE */
      { path: 'form-post/:id?', name: 'formPost', component: () => import('pages/FormPost.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
