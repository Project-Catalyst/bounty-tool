<template>
    <div class="container is-widescreen">
        <div class="section">
            <div class="columns">
                <div class="column is-8-desktop">
                    <h1 class="title">{{ project.name }}</h1>
                    <a :href="project.url" target="_blank">repo link</a>
                    <p>
                        {{ project.description }}
                    </p>
                </div>
                <div class="column is-2-desktop">
                    <div class="buttons">
                        <b-button expanded>Export CSV</b-button>
                        <b-button
                            tag="router-link"
                            :to="{ name: 'bounty' }"
                            expanded
                            >{{ addBtnTxt }}</b-button
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
            <b-field grouped group-multiline label="">
                <div class="control">
                    <b-switch v-model="showOpen">Open</b-switch>
                    <b-switch v-model="showStarted">Started</b-switch>
                    <b-switch v-model="showClosed">Closed</b-switch>
                </div>
            </b-field>
            <b-table :data="filteredBounties(project.bounties)" striped default-sort-direction="ASC">
                <b-table-column field="name" label="Name" sortable v-slot="props">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="amount" label="Amount" sortable numeric v-slot="props">
                    {{ props.row.amount }} ADA
                </b-table-column>
                <b-table-column field="created" label="Created" sortable v-slot="props">
                    {{
                        props.row.created !== null
                            ? parseEpochSeconds(props.row.created)
                            : "-"
                    }}
                </b-table-column>
                <b-table-column field="created" label="Updated" sortable v-slot="props">
                    {{
                        props.row.updated !== null
                            ? parseEpochSeconds(props.row.updated)
                            : "-"
                    }}
                </b-table-column>
                <b-table-column field="created" label="Status" v-slot="props">
                    <span class="tag is-success is-light" v-if="props.row.state.open">open</span>
                    <span class="tag is-success" v-if="props.row.state.initiated">started</span>
                    <span class="tag is-primary" v-if="props.row.state.closed">closed </span>
                </b-table-column>
                <b-table-column field="Actions" v-slot="props">
                    <b-button
                        tag="router-link"
                        :to="{
                            name: 'bounty',
                            query: { uuid: props.row.uuid },
                        }"
                        expanded
                        >Edit</b-button
                    >
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
    import {
        LocalDate,
        DateTimeFormatter,
        Instant,
    } from "@js-joda/core";

    export default {
        name: "DashboardView",
        data: function () {
            return {
                showOpen: true,
                showAssigned: true,
                showStarted: true,
                showClosed: true,
                addBtnTxt: "Add a New Bounty",
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
                    if (!this.showStarted && item.state.started) return false;
                    if (!this.showClosed && item.state.closed) return false;
                    return true;
                });
            },
        },
        mounted() {},
    };
</script>