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
                type="is-primary"
                tag="router-link"
                :to="{ name: 'project' }"
            >
                Start a new project
            </b-button>
            <b-button type="is-primary" @click="importCSV">
                Open existing project
            </b-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "HomeView",
        computed: {
            ...mapState({
                profile: (state) => state.profile,
                project: (state) => state.project
            }),
        },
        methods: {
            importCSV() {
                console.log("import CSV");
            },
        }
    };
</script>
