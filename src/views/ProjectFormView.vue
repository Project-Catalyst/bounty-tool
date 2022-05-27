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
                            placeholder="Catalyst Community Site"
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
                    <div class="column is-7-desktop properties">
                        <div
                            v-for="(prop, idx) in properties"
                            :key="prop.uuid"
                            class="columns is-full-desktop"
                        >
                            <field-component
                                type="text"
                                label="Property"
                                rules="required|min:5"
                                :label-visible="false"
                                placeholder="Property name"
                                v-model="prop.name"
                                class="column is-4-desktop pt-0 pb-0"
                            />
                            <field-component
                                type="text"
                                label="Options"
                                rules="required"
                                :label-visible="false"
                                placeholder="Option 1,Option 2, ..."
                                v-model="prop.options"
                                class="column is-5-desktop pt-0 pb-0 options"
                            />
                            <b-field class="mt-2 is-2-desktop" size="is-medium">
                                <b-checkbox v-model="prop.private">
                                    Private
                                    <b-tooltip label="You might want to keep some things private (emails and wallet addresses)" multilined>
                                        <b-icon icon="help-circle"></b-icon>
                                    </b-tooltip>
                                </b-checkbox>
                            </b-field>
                            
                            <b-button
                                class="column is-1-desktop pt-0 pb-0"
                                type="is-danger"
                                icon-right="delete-forever"
                                @click="removeProperty(idx)"
                            >
                            </b-button>
                        </div>

                        <b-button
                            type="is-primary"
                            @click="addProperty"
                            class="is-pulled-right "
                        >
                            Add new Property</b-button
                        >
                    </div>
                </div>
                <div class="columns pr-0">
                    <div class="column is-full-desktop pr-0">
                        <div class="buttons is-right is-mobile">
                            <b-button
                                type="is-danger"
                                @click="confirmDelete(`Project ${project.name} deleted`)"
                            >
                                Delete Project
                            </b-button>
                            <b-button
                                type="is-warning-light"
                                tag="router-link"
                                :to="{ name: 'dashboard' }"
                            >
                                Cancel
                            </b-button>
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
    import deleteProjectConfirmationMixin from "../mixins/deleteProjectConfirmationMixin"

    export default {
        components: { FieldComponent, ValidationObserver },
        mixins: [
            debounceMixin(["createProject", "addProperty", "removeProperty"], {
                createProject: 1000,
                addProperty: 200,
                removeProperty: 200,
            }),
            deleteProjectConfirmationMixin
        ],
        name: "ProjectFormView",
        data: function () {
            return {
                name: null,
                url: null,
                description: null,
                properties: [],
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
                        this.properties = [];          
                        self.$router.push('/dashboard')
                    },duration)
                    

                });
            },
            addProperty: function () {
                this.properties.push({ uuid: uuidv4(), name: null, options: null, private:false });
            },
            removeProperty: function (idx) {
                const index = idx;
                const duration = 1000;
                const self = this;
                const name = this.properties[idx].name;
                this.$buefy.dialog.confirm({
                type: "is-danger",
                title: "Delete Confirmation",
                confirmText: "DELETE",
                message:
                    "Are you sure you want to delete this property?",
                onConfirm: () => {
                    self.$buefy.toast.open({
                        duration: duration,
                        message: `Property ${name} deleted`,
                        position: "is-top",
                        type: "is-success",
                    });
                    this.properties.splice(index, 1);
                },
            });
                
            },
        },
        mounted: function () {
            if(this.$route.hash !== 'undefined' && this.$route.hash === "#edit") this.edit = true
            this.name = this.project.name
            this.url = this.project.url
            this.description = this.project.description
            this.properties = this.lodash.cloneDeep(this.project.properties)
        },
    };
</script>
<style scoped>
    @media screen and (min-width: 1024px) {
        .properties {
            padding-top: 3.5rem;
        }
    }
</style>
