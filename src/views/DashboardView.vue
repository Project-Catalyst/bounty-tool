<template>
    <div class="container is-widescreen">
        <div class="section">
            <div class="columns">
                <div class="column is-3-desktop">
                    <h1 class="title">{{ project.name }}</h1>
                    <a :href="project.url" target="_blank">repo link</a>
                    <p>
                        {{ project.description }}
                    </p>
                </div>
                <div class="column is-5-desktop">
                    <div class="section" v-if="project.properties.length > 0">
                        <b-table :data="project.properties" striped>
                            <b-table-column
                                field="name"
                                label="Property"
                                v-slot="props"
                            >
                                {{ props.row.name }}
                            </b-table-column>
                            <b-table-column
                                field="options"
                                label="Options"
                                v-slot="props"
                            >
                                <b-taglist>
                                    <b-tag
                                        type="is-info"
                                        v-for="(
                                            option, idx
                                        ) in getTags(props.row.options)"
                                        :key="idx"
                                    >
                                        {{ option }}
                                    </b-tag>
                                </b-taglist>
                            </b-table-column>
                            <b-table-column
                                field="private"
                                label="Private"
                                v-slot="props"
                            >
                                <b-checkbox
                                    disabled
                                    :value="props.row.private"
                                ></b-checkbox>
                            </b-table-column>
                        </b-table>
                    </div>
                </div>
                <div class="column is-2-desktop">
                    <div class="buttons">
                        <b-button
                            type="is-danger"
                            @click="confirmDelete(`Project ${project.name} deleted`)"
                            expanded
                        >
                            Delete Project
                        </b-button>
                        <b-button expanded @click="exportCSV"
                            >Export CSV</b-button
                        >
                        <b-button
                            tag="router-link"
                            :to="{ name: 'project', hash: '#edit' }"
                            expanded
                            >Edit Project Settings</b-button
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-if="project.bounties.length > 0">
            <b-button
                tag="router-link"
                :to="{ name: 'bounty' }"
                expanded
                class="mb-5"
                >{{ addBtnTxt }}</b-button
            >
            <b-field grouped group-multiline label="">
                <div class="control">
                    <b-switch v-model="showOpen">Open</b-switch>
                    <b-switch v-model="showInitiated">Initiated</b-switch>
                    <b-switch v-model="showClosed">Closed</b-switch>
                </div>
            </b-field>
            <b-table
                :data="filteredBounties(project.bounties)"
                striped
                default-sort-direction="ASC"
            >
                <b-table-column
                    field="name"
                    label="Name"
                    sortable
                    v-slot="props"
                >
                    <a href="#" @click="showDetails(props.row.uuid)">{{ props.row.name }}</a>
                </b-table-column>
                <b-table-column
                    field="amount"
                    label="Amount"
                    sortable
                    numeric
                    v-slot="props"
                >
                    {{ props.row.amount }} ADA
                </b-table-column>
                <b-table-column
                    field="created"
                    label="Created"
                    sortable
                    v-slot="props"
                >
                    {{
                        props.row.created !== null
                            ? parseEpochSeconds(props.row.created)
                            : "-"
                    }}
                </b-table-column>
                <b-table-column
                    field="created"
                    label="Updated"
                    sortable
                    v-slot="props"
                >
                    {{
                        props.row.updated !== null
                            ? parseEpochSeconds(props.row.updated)
                            : "-"
                    }}
                </b-table-column>
                <b-table-column field="created" label="Status" v-slot="props">
                    <span
                        class="tag is-success is-light"
                        v-if="props.row.state.open"
                        >open</span
                    >
                    <span
                        class="tag is-success"
                        v-if="props.row.state.initiated"
                        >initiated</span
                    >
                    <span class="tag is-primary" v-if="props.row.state.closed"
                        >closed
                    </span>
                </b-table-column>
                <b-table-column field="Actions" v-slot="props">
                    <div class="buttons is-right">
                        <b-button
                            type="is-success"
                            @click="showAssignBounty(props.row.uuid)"
                        >
                            Assign Bounty
                        </b-button>
                        <b-button
                            tag="router-link"
                            :to="{
                                name: 'bounty',
                                query: { uuid: props.row.uuid },
                            }"
                            >Edit</b-button
                        >
                        <b-button
                            type="is-danger"
                            @click="confirmDeleteBounty(props.row.uuid)"
                        >
                            Delete
                        </b-button>
                    </div>
                </b-table-column>
            </b-table>
        </div>
        <div class="section" v-else>
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">No Bounties</p>
                        <p>
                            <b-button
                                tag="router-link"
                                :to="{ name: 'bounty' }"
                                size="is-small"
                                expanded
                                >{{ addBtnTxt }}</b-button
                            >
                        </p>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    import "@js-joda/timezone";
    import { Locale } from "@js-joda/locale_en";
    import { LocalDate, DateTimeFormatter, Instant } from "@js-joda/core";
    import { downloadCsv } from "../export-csv";
    import BountyModal from "../components/BountyModal.vue";
    import AssignBountyModal from "../components/AssignBountyModal.vue";
    import deleteProjectConfirmationMixin from "../mixins/deleteProjectConfirmationMixin";

    export default {
        name: "DashboardView",
        mixins: [deleteProjectConfirmationMixin],
        data: function () {
            return {
                showOpen: true,
                showAssigned: true,
                showInitiated: true,
                showClosed: true,
                addBtnTxt: "Add a New Bounty"
            };
        },
        computed: {
            ...mapState({
                profile: (state) => state.profile,
                project: (state) => state.project,
            }),
        },
        methods: {
            parseEpochSeconds(milliseconds) {
                const ldt = LocalDate.ofInstant(Instant.ofEpochMilli(milliseconds));
                const formatter = DateTimeFormatter.ofPattern("dd/MM/Y").withLocale(
                    Locale.ENGLISH
                );
                return ldt.format(formatter);
            },
            filteredBounties(bounties) {
                return bounties.filter((item) => {
                    if (!this.showOpen && item.state.open) return false;
                    if (!this.showInitiated && item.state.initiated) return false;
                    if (!this.showClosed && item.state.closed) return false;
                    return true;
                });
            },
            confirmDeleteBounty(uuid) {
                const duration = 1000;
                const self = this;
                const toastMsg = `Bounty ${self.project.name} deleted!`;
                this.$buefy.dialog.confirm({
                    type: "is-danger",
                    title: "Delete Confirmation",
                    confirmText: "DELETE",
                    message:
                        "Are you sure you want to delete this Bounty?",
                    onConfirm: () => {
                        self.$buefy.toast.open({
                            duration: duration,
                            message: toastMsg,
                            position: "is-top",
                            type: "is-success",
                        });

                        setTimeout(() => {
                            self.$store.commit("project/deleteBounty",uuid)
                        }, duration);
                    },
                });
            },
            exportCSV() {
                downloadCsv(this.project)
            },
            showDetails(uuid){
                const bounty = this.project.bounties.filter( bounty => bounty.uuid === uuid)[0]

                this.$buefy.modal.open({
                    parent: this,
                    props: { 'bounty': bounty, 'projectProperties': this.project.properties },
                    component: BountyModal,
                    hasModalCard: true,
                    trapFocus:true
                })
            },
            showAssignBounty(uuid){
                const bounty = this.project.bounties.filter( bounty => bounty.uuid === uuid)[0]
                this.$buefy.modal.open({
                    parent: this,
                    props: { 'bounty': bounty, 'projectProperties': this.project.properties },
                    component: AssignBountyModal,
                    hasModalCard: true,
                    trapFocus:true
                })
            },
            getTags(str){
                const all = str.split(',')
                const result = []
                all.forEach( a => {
                    if(result.join(',').length < 35){
                        result.push(a)
                    }
                })
                if(result.length < all.length){
                        result.push('...')
                }
                
                return result
            }

        },
        
    };
</script>