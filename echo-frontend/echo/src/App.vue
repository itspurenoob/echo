<template>
	<navbar
		:pages="pages"
		:active-page="activePage"
		:nav-link-click="(index) => activePage = index"
	>
		
	</navbar>

<!-- 	<page-viwer
		:page="pages[activePage]"
	>
	</page-viwer> -->

	<create-page
		:page-created="pageCreated"
	>
		
	</create-page>
</template>

<script>

	import pageViwer from './components/PageViwer.vue';
   import Navbar from './components/Navbar.vue'
   import createPage from './components/CreatePage.vue'

	export default {
		components: {
			Navbar,
			pageViwer,
         createPage
		},
      created()
      {
         this.getPages()
      },
		data() {
			return {
				activePage:0,
				pages: []
			}
		},
      methods: {
         async getPages() 
         {
            let res = await fetch('pages.json');
            let data = await res.json();

            this.pages = data;
         },
         pageCreated(pageObj) 
         {
         	console.log(pageObj);
         }
      }
	}

</script>