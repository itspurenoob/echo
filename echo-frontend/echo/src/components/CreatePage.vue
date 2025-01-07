<template>
	<div class="container mb-3">
		<form action="">
		<div class="row g-3">
		<div class="col">	
			<div class="mb-3">
				<label for="" class="form-label">
					Page Title
				</label>
				<input 
					type="text" 
					class="form-control"
					v-model="pageTitle"
				>
			</div>

			<div class="mb-3">
				<label for="" class="form-label">
					Content
				</label>

				<textarea
					type="text"
					class="form-control"
					rows="5"
					v-model="content"
				>
				</textarea>

			</div>
		</div>

		<div class="col">
				<div class="mb-3">
					<label for="" class="form-label">
						Content
					</label>
					<input 
					type="text" 
					class="form-control"
					v-model="linkText"
					>
				</div>

				<div class="mb-3">
					<label for="" class="form-label">
						link URL
					</label>
					<input 
					type="text"
					class="form-control" 
					v-model="linkUrl"
					>
				</div>

				<div class="mb-3">
					<div class="form-check">
						<input 
						class="form-check-input"
						type="checkbox">
						<label 
						class="form-check-label"
						for="gridCheck"></label>
					</div>
				</div>

			</div>
		</div>

			<div class="mb-3">
				<button 
				class="btn btn-primary"
				:disabled="inFormInvalid"
				@click.prevent="submitForm"

				>Create Page</button>
			</div>

		</form>
	</div>
</template>

<script>
	export default {
		props: ['pageCreated'],

		computed: {
			inFormInvalid()
			{
				return !this.pageTitle || !this.content || !this.linkUrl || !this.linkText;
			}
		},

		data()
		{
			return {
				pageTitle: '',
				content:'',
				linkText:'',
				linkUrl:''
			}
		},
		methods: {
			submitForm()
			{
				if(!this.pageTitle || !this.content || !this.linkUrl || !this.linkText)
				{
					alert('Please fill the form.')
				}
				else
				{
					this.pageCreated({
						pageTitle: this.pageTitle,
						content: this.content,
						link:{
							url:this.linkUrl,
							text:this.linkText
						}
					})	
				}
			}
		}
	}
</script>