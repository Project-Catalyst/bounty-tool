<template>
    <ValidationProvider
        :rules="rules"
        v-slot="{ errors }"
        :name="label"
        ref="validator"
    >
        <b-field :label="labelVisible ? label : null" :type="getLabelType()">
            <b-input
                v-if="
                    type === 'text' || type === 'textarea' || type === 'number'
                "
                :type="type"
                :placeholder="placeholder"
                @input="handleInput"
                :value="value"
                :disabled="disabled"
            ></b-input>
            <b-select
                :placeholder="placeholder"
                v-if="type === 'select'"
                :required="required ? 'required':''"
                :value="value"
                @input="handleInput"
                :disabled="disabled"
            >
                <option></option>
                <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.name"
                >
                    {{ option.label }}
                </option>
            </b-select>
        </b-field>
        <div class="control">
            <p class="help" v-if="typeof helptext !== undefined">
                {{ helptext }}
            </p>
            <span class="help is-danger" v-for="error in errors" :key="error">
                {{ error }}
            </span>
        </div>
    </ValidationProvider>
</template>

<script>
    export default {
        name: "FieldComponent",
        props: {
            label: String,
            placeholder: String,
            type: String,
            helptext: String,
            value: String,
            rules: String,
            size: String,
            options: Array,
            disabled: Boolean,
            required:Boolean,
            labelVisible: { type: Boolean, default: true },
        },
        methods: {
            handleInput(value) {
                this.$emit("input", value);
            },
            getLabelType() {
                // console.log(this.$refs.validator)
                if (this.$refs.validator === undefined) return "";
                if (this.$refs.validator.errors.length > 0) return "is-danger";
                if (this.$refs.validator.value === null) return "";

                return "is-success";
            },
        },
        created() {
            // console.log(this.placeholder);
        },
    };
</script>
