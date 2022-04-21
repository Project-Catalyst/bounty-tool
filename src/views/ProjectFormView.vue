<template>
    <ValidationObserver v-slot="{ invalid }" tag="form" ref="form">
        <div class="container is-widescreen">
            <div class="section">
                <div class="columns">
                    <div class="column is-5-desktop">
                        <field-component
                            label="Project Name"
                            type="text"
                            rules="required|min:5"
                            placeholder="i.e. Catalyst Community Site"
                            helptext="Memorable name of the project"
                            v-model="name"
                            :value="name"
                        />
                        <field-component
                            label="Project Repo URL"
                            type="text"
                            rules="required|url"
                            placeholder="https://github.com/Project-Catalyst/project-catalyst.github.io.git"
                            v-model="url"
                        />
                        <field-component
                            label="Project Description"
                            type="textarea"
                            rules="required"
                            placeholder="Project Description"
                            v-model="description"
                        />
                    </div>
                    <div class="column is-7-desktop categories">
                        <div
                            v-for="(cat, idx) in categories"
                            :key="cat.uuid"
                            class="columns"
                        >
                            <field-component
                                type="text"
                                label="Category"
                                rules="required|min:5"
                                :label-visible="false"
                                placeholder="Category name"
                                v-model="cat.name"
                                class="column is-4-desktop pt-0 pb-0"
                            />
                            <field-component
                                type="text"
                                label="Options"
                                rules="required"
                                :label-visible="false"
                                placeholder="options,comma,separated"
                                v-model="cat.options"
                                class="column is-7-desktop pt-0 pb-0 options"
                            />
                            <b-button
                                class="column is-1-desktop pt-0 pb-0"
                                type="is-danger"
                                icon-right="delete-forever"
                                @click="removeCategory(idx)"
                            >
                            </b-button>
                        </div>

                        <b-button
                            type="is-primary"
                            @click="addCategory"
                            class="is-pulled-right"
                        >
                            Add new Category</b-button
                        >
                    </div>
                </div>
                <div class="columns pr-0">
                    <div class="column is-full-desktop pr-0">
                        <div class="buttons is-right is-mobile">
                            <b-button
                                :disabled="invalid"
                                type="is-primary"
                                @click="createProject"
                            >
                                {{ edit ? 'Save' : 'Create'}} Project
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ValidationObserver>
</template>

<script>
    import { ValidationObserver } from "vee-validate"
    import FieldComponent from "../components/FieldComponent.vue"
    import debounceMixin from "../mixins/debounceMixin"
    import { mapState } from "vuex"
    import { v4 as uuidv4 } from "uuid"

    export default {
        components: { FieldComponent, ValidationObserver },
        mixins: [
            debounceMixin(["createProject", "addCategory", "removeCategory"], {
                createProject: 2000,
                addCategory: 200,
                removeCategory: 200,
            }),
        ],
        name: "ProjectFormView",
        data: function () {
            return {
                name: null,
                url: null,
                description: null,
                categories: [],
                edit:false
            };
        },
        computed: {
            ...mapState({
                project: (state) => state.project,
            }),
        },
        methods: {
            createProject: function () {
                // console.log("Create Project");
                this.$refs.form.validate().then((success) => {
                    if (!success) {
                        return;
                    }
                    const duration = 2000
                    
                    this.$store.commit('project/createProject',this.lodash.cloneDeep(this.$data))
                    const toastMsg = `Project ${this.name} ${this.edit ? 'updated': 'created'}!` 
                    this.$buefy.toast.open({
                        duration:duration,
                        message: toastMsg,
                        position: "is-top",
                        type: 'is-success'
                    })
                    
                    const self = this
                    setTimeout(()=>{
                        this.name = this.url = this.description = null;
                        this.categories = [];          
                        self.$router.push('/dashboard')
                    },duration)
                    

                });
            },
            addCategory: function () {
                this.categories.push({ uuid: uuidv4(), name: null, options: null });
            },
            removeCategory: function (idx) {
                this.categories.splice(idx, 1);
            },
        },
        mounted: function () {
            if(this.$route.hash !== 'undefined' && this.$route.hash === "#edit") this.edit = true
            this.name = this.project.name
            this.url = this.project.url
            this.description = this.project.description
            this.categories = this.lodash.cloneDeep(this.project.categories)
        },
    };
</script>
<style scoped>
    @media screen and (min-width: 1024px) {
        .categories {
            padding-top: 3.5rem;
        }
    }
</style>
