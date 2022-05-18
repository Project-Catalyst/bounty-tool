<template>
    <div class="container is-widescreen">
        <div class="section">
            
        </div>
        Profile View

        Default options

        amount: 10,
        increment: null,
        incrementDisabled: false,
        incrementPeriod: null,
        incrementPeriodSize: null,
        reviewAmount: null,
        reviewAmountDisabled: false,
        adminAmount: null,
        adminAmountDisabled: false,
        submitterAmount: null,
        submitterAmountDisabled: false,
        issueUrl: null,
        level: null,
        complexity: null,
    </div>
</template>
<script>

import { mapState } from "vuex";
export default {
    name:"ProfileView",
     data: function () {
            return {}
     },
     computed: {
            ...mapState({
                profile: (state) => state.profile
            }),
        },
}
</script>

