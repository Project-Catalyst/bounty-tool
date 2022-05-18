<template>
    <div class="container section">
        <b-message>
            <p>
                This tool is designed to help funded proposals to manage their
                bounties if they choose do so. <br />
                It's a community made tool for the community. Please report any
                bugs.
            </p>
        </b-message>

        <b-message type="is-warning" has-icon>
            This tool uses localStorage and cookies to store the progress of
            your work.<br />
            If you're using a setup where cookies are cleared at every browser
            launch, be careful because you may lose your work! You should export
            (download) the file, and re-import it every time or add a exception
            to your browser's settings.<br />
            We plan to add server authentication mechanism in the future
            versions to avoid this problem.
        </b-message>

        <b-message type="is-info" has-icon v-if="profile.localDb">
            <p>
                Hello <strong>{{ profile.info.name }}</strong
                >,<br />
                your database is already loaded in the app.<br />
                You can continue your work clicking on the button below.
            </p>
        </b-message>

        <div class="buttons is-centered">
            <b-button
                :disabled="showUpload"
                type="is-primary"
                tag="router-link"
                :to="{ name: 'project' }"
            >
                Start a new project
            </b-button>
            <b-button
                type="is-primary"
                @click="
                    () => {
                        showUpload = true;
                    }
                "
            >
                Open existing project
            </b-button>
        </div>

        <div class="csv-load" v-if="showUpload">
            <b-field class="file is-primary">
                <b-upload
                    v-on:input="readFile"
                    drag-drop
                    expanded
                    accept=".csv"
                >
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon
                                    icon="upload"
                                    size="is-large"
                                    v-if="!csv"
                                ></b-icon>
                                <b-icon
                                    icon="check"
                                    size="is-large"
                                    v-if="csv"
                                ></b-icon>
                            </p>
                            <p>Drop your file here or click to upload</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>

            <b-message v-if="csv" type="is-success">
                No of bounties to be loaded: {{ csv.data.length }}
            </b-message>

            <b-message v-if="!csv" type="is-information">
                Upload CSV to load bounties.
            </b-message>
            <div class="buttons is-left">
                <b-button type="is-primary" :disabled="!csv" @click="importData">
                    Import Bounties
                </b-button>
                <b-button
                    type="is-primary"
                    @click="() => {csv = null; showUpload = false;}">
                    Cancel
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { PROJECT_PREFIX, PROPERTY_PREFIX } from "@/export-csv"
    import DefaultState from "../store/DefaultState"

    export default {
        name: "HomeView",
        data: function () {
            return {
                csv: null,
                showUpload: false,
            };
        },
        computed: {
            ...mapState({
                project: (state) => state.project,
                profile: (state) => state.profile,
            }),
        },
        methods: {
            importData() {
                const project = DefaultState.project()
                if (this.csv) {
                    if (this.csv.data) {
                        this.csv.data.forEach( (row) =>{
                                const bounty = DefaultState.bounty()
                                if(project.name===null){
                                    Object.keys(row).filter( key => key.startsWith(PROJECT_PREFIX)).forEach( key =>{
                                        project[key.replace(PROJECT_PREFIX,'')]=row[key]
                                    })
                                }
                                Object.keys(row).filter( 
                                    key => !key.startsWith(PROJECT_PREFIX) && !key.startsWith(PROPERTY_PREFIX)).forEach( key =>{
                                        console.log(`Pushing ${key}`)
                                    bounty[key]=row[key]  
                                })
                                Object.keys(row).filter( key => key.startsWith(PROPERTY_PREFIX)).forEach( key => {
                                    bounty.properties[key.replace(PROPERTY_PREFIX,'')]=row[key]
                                })
                                project.bounties.push(bounty)
                                
                        })
                        this.$store.commit("project/createProject", project);
                        this.$router.push({ name: "dashboard" });
                    }
                }
            },
            readFile(file) {
                this.$papa.parse(file, {
                    header: true,
                    complete: (results) => {
                        console.log(results);
                        this.csv = results;
                    },
                    transform: (value, col) => {
                        // console.log(`${col}=${value}`)
                        if(value==="null") return null
                        if(value==="true") return true
                        if(value==="false") return false
                        if(["project_properties",
                            "state",
                            "project_created"
                            ].includes(col)) return JSON.parse(value)
                        if(["amount","increment","incrementPeriodSize"].includes(col)) return parseInt(value)
                        return value
                    },
                    transformHeader: (header) =>{
                        // console.log("header",header)
                        return header
                    },
                    skipEmptyLines: true,
                });
            },
            
        },
    };
</script>
