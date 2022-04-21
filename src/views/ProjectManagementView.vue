<template>
    <div class="container is-widescreen">
        <div class="section columns">
            <div class="column is-3-desktop is-full-mobile">
              
            </div>
            <div class="column is-5-desktop is-full-mobile">

            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "ProjectFormView",
        computed: {
            ...mapState({
                profile: (state) => state.profile,
            }),
        },
    };
</script>
