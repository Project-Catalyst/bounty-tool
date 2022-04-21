<template>
    <div class="field">
        <field-component label="Name" v-model="name"/>
        <field-component label="Name" v-model="options"/>
    </div>
</template>

<script>
    import FieldComponent from "./FieldComponent.vue"
    export default {
        name: "CategoryComponent",
        components:{ FieldComponent },
        props: {},
        data() {
            return {
                name: null,
                options:null
            }
        },
        methods: {},
        created() {},
    };
</script>
