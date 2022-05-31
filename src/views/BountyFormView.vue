<template>
    <ValidationObserver v-slot="{ invalid }" tag="form" ref="form">
        <div class="container is-widescreen">
            <div class="section">
                <h1 class="title">Details</h1>

                <div class="columns">
                    <!-- Title, Description, Auxiliary -->
                    <div class="column is-half-desktop">
                        <!-- Bounty Title-->
                        <field-component
                            label="Bounty Title"
                            type="text"
                            rules="required|min:5"
                            placeholder="Fix typos on page x"
                            v-model="bounty.name"
                            :value="bounty.name"
                        />
                        <!-- Description -->
                        <field-component
                            label="Bounty Description"
                            type="textarea"
                            rules="required"
                            placeholder="Bounty Description"
                            v-model="bounty.description"
                        />
                    </div>

                    <div class="column is-half-desktop">
                        <!-- Amount -->
                        <field-component
                            label="Amount"
                            type="number"
                            rules="required|min_value:1"
                            placeholder="100 ADA"
                            v-model="bounty.amount"
                        />
                        <div class="columns">
                            <!-- Increment -->
                            <div class="column is-2-desktop">
                                <field-component
                                    label="Increment"
                                    type="number"
                                    :rules="
                                        bounty.incrementDisabled
                                            ? ''
                                            : 'required|min_value:1'
                                    "
                                    placeholder="10 ADA"
                                    v-model="bounty.increment"
                                    :disabled="bounty.incrementDisabled"
                                />
                            </div>
                            <!-- Period -->
                            <div class="column is-3-desktop">
                                <field-component
                                    label="Period Count"
                                    type="number"
                                    :rules="
                                        bounty.incrementDisabled
                                            ? ''
                                            : 'required|min_value:1'
                                    "
                                    :placeholder="
                                        bounty.incrementPeriod === null
                                            ? ''
                                            : 'Number of ' +
                                              bounty.incrementPeriod.toLowerCase() +
                                              '(s)'
                                    "
                                    v-model="bounty.incrementPeriodSize"
                                    :disabled="bounty.incrementDisabled"
                                />
                            </div>
                            <!-- Disable -->
                            <div class="column is-3-desktop">
                                <field-component
                                    label="Period Size"
                                    type="select"
                                    :rules="
                                        bounty.incrementDisabled
                                            ? ''
                                            : 'required'
                                    "
                                    placeholder="Select a increment period"
                                    :options="[
                                        { label: 'Day', value: 'Day' },
                                        { label: 'Week', value: 'Week' },
                                        { label: 'Month', value: 'Month' },
                                    ]"
                                    v-model="bounty.incrementPeriod"
                                    :disabled="bounty.incrementDisabled"
                                />
                            </div>
                            <div class="column is-4-desktop">
                                <b-field label="Disable increment">
                                    <b-checkbox
                                        v-model="bounty.incrementDisabled"
                                        class="mt-2"
                                        size="is-medium"
                                    >
                                    </b-checkbox>
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <!-- Review,Admin,Submitter amount -->
                    <div class="column is-half-desktop">
                        <h1 class="title">Auxiliary Bounties</h1>
                        <div class="columns">
                            <!-- Review amount -->
                            <div class="column is-half-desktop">
                                <field-component
                                    label="Review amount"
                                    type="number"
                                    :rules="
                                        bounty.reviewAmountDisabled
                                            ? ''
                                            : 'required|min_value:1'
                                    "
                                    placeholder="10 ADA"
                                    v-model="bounty.reviewAmount"
                                    :disabled="bounty.reviewAmountDisabled"
                                />
                            </div>
                            <div class="column is-half-desktop">
                                <b-field label="No review amount">
                                    <b-checkbox
                                        v-model="bounty.reviewAmountDisabled"
                                        class="mt-2"
                                        size="is-medium"
                                    >
                                    </b-checkbox>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <!-- Admin amount -->
                            <div class="column is-half-desktop">
                                <field-component
                                    label="Admin amount"
                                    type="number"
                                    :rules="
                                        bounty.adminAmountDisabled
                                            ? ''
                                            : 'required|min_value:1'
                                    "
                                    placeholder="10 ADA"
                                    v-model="bounty.adminAmount"
                                    :disabled="bounty.adminAmountDisabled"
                                />
                            </div>

                            <div class="column is-half-desktop">
                                <b-field label="No admin amount">
                                    <b-checkbox
                                        v-model="bounty.adminAmountDisabled"
                                        class="mt-2"
                                        size="is-medium"
                                    >
                                    </b-checkbox>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <!-- Submitter amount -->
                            <div class="column is-half-desktop">
                                <field-component
                                    label="Submitter amount"
                                    type="number"
                                    :rules="
                                        bounty.submitterAmountDisabled
                                            ? ''
                                            : 'required|min_value:1'
                                    "
                                    placeholder="10 ADA"
                                    v-model="bounty.submitterAmount"
                                    :disabled="bounty.submitterAmountDisabled"
                                />
                            </div>
                            <div class="column is-half-desktop">
                                <b-field label="No submitter amount">
                                    <b-checkbox
                                        v-model="bounty.submitterAmountDisabled"
                                        class="mt-2"
                                        size="is-medium"
                                    >
                                    </b-checkbox>
                                </b-field>
                            </div>
                        </div>

                    </div>
                    <!-- Custom Properties, Level & Complexity -->
                    <div class="column is-half-desktop">
                        <h1 class="title">Properties
                            <b-tooltip label="See project setup to setup properties">
                                <b-icon icon="help-circle"></b-icon>
                            </b-tooltip>
                        </h1>
                        <!-- Level & Complexity -->
                        <!-- <div class="columns">
                            <div class="column is-half-desktop">
                                <field-component
                                    label="Bounty Level"
                                    type="select"
                                    rules="required"
                                    placeholder="Select a level"
                                    :options="[
                                        {
                                            label: 'Urgent',
                                            value: 'Urgent',
                                        },
                                        {
                                            label: 'Important',
                                            value: 'Important',
                                        },
                                    ]"
                                    v-model="bounty.level"
                                />
                            </div>
                            <div class="column is-half-desktop">
                                <field-component
                                    label="Bounty complexity"
                                    type="select"
                                    rules="required"
                                    :options="[
                                        {
                                            label: 'Simple',
                                            value: 'Simple',
                                        },
                                        {
                                            label: 'Medium',
                                            value: 'Medium',
                                        },
                                        { label: 'Hard', value: 'Hard' },
                                    ]"
                                    placeholder="Select complexity"
                                    v-model="bounty.complexity"
                                />
                            </div>
                        </div> -->

                        <!-- Custom properties -->
                        <div
                            class="column is-full-desktop"
                            v-for="prop in project.properties"
                            :key="prop.uuid"
                        >
                            <b-field
                                :label="`${prop.name} ${
                                    prop.private ? '(Private)' : '(Public)'
                                }`"
                            >
                                <b-select
                                    placeholder="Select"
                                    v-model="bounty.properties[prop.uuid]"
                                >
                                    <option></option>
                                    <option
                                        v-for="(
                                            opt, idx
                                        ) in prop.options.split(',')"
                                        :key="idx"
                                        :value="opt"
                                    >
                                        {{ opt }}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-half-desktop">
                        <!-- Status -->
                        <b-field grouped group-multiline v-if="edit">
                            <div class="control">
                                <b-switch
                                    v-model="bounty.state.open"
                                    @input="updateState('open', $event)"
                                    >Open</b-switch
                                >
                                <b-switch
                                    v-model="bounty.state.initiated"
                                    @input="updateState('initiated', $event)"
                                    >Initiated</b-switch
                                >
                                <b-switch
                                    v-model="bounty.state.closed"
                                    @input="updateState('closed', $event)"
                                    >Closed</b-switch
                                >
                            </div>
                        </b-field>
                    </div>
                    <div class="column is-half-desktop">
                        <div class="buttons is-right is-mobile">
                            <b-button
                                tag="router-link"
                                :to="{ name: 'dashboard' }"
                                >Cancel</b-button
                            >
                            <b-button
                                :disabled="invalid"
                                type="is-primary"
                                @click="createBounty"
                            >
                                {{ edit ? "Update" : "Create" }} Bounty
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ValidationObserver>
</template>
<script>
    import { ValidationObserver } from "vee-validate";
    import FieldComponent from "../components/FieldComponent.vue";
    import debounceMixin from "../mixins/debounceMixin";
    import { mapState, mapGetters } from "vuex";
    import DefaultState from "../store/DefaultState";

    export default {
        name: "BountyFormView",
        components: { FieldComponent, ValidationObserver },
        mixins: [
            debounceMixin(["createBounty"], {
                createBounty: 500,
            }),
        ],
        data: function () {
            return {
                bounty: DefaultState.bounty(),
                edit: false,
            };
        },
        computed: {
            ...mapState({
                project: (state) => state.project,
            }),
            ...mapGetters("project", ["getBountyByUUID"]),
        },
        methods: {
            createBounty: function () {
                this.$refs.form.validate().then((success) => {
                    if (!success) {
                        return;
                    }
                    let mutation = "project/createBounty";
                    if (this.edit) {
                        mutation = "project/updateBounty";
                        this.bounty.updated = Date.now();
                    } else {
                        this.bounty.created = Date.now();
                    }
                    this.$store.commit(
                        mutation,
                        this.lodash.cloneDeep(this.bounty)
                    );
                    const duration = 2000;
                    const self = this;
                    this.$buefy.toast.open({
                        duration: duration,
                        message: `Bounty "${self.bounty.name}" ${
                            self.edit ? "updated" : "created"
                        }!`,
                        position: "is-top",
                        type: "is-success",
                    });
                    setTimeout(() => {
                        self.$router.push("/dashboard");
                    }, duration);
                });
            },
            updateState(state, value) {
                if (value) {
                    Object.keys(this.bounty.state).forEach((key) => {
                        if (key === state) this.bounty.state[key] = value;
                        else this.bounty.state[key] = !value;
                    });
                }
            },
        },
        async mounted() {
            if (
                this.$route.query.uuid !== undefined &&
                this.$route.query !== undefined
            ) {
                this.edit = true;
                this.bounty = await this.lodash.cloneDeep(
                    this.getBountyByUUID(this.$route.query.uuid)
                );
            }

            if (this.bounty.properties === undefined) {
                console.log("creating properties");
                this.bounty.properties = {};
            }

            this.project.properties.forEach((prop) => {
                if (this.bounty.properties[prop.uuid] === undefined) {
                    console.log("creating", prop);
                    // Object.assgin(this.bounty.properties[prop.uuid]
                }
            });
            // console.log(this.bounty);
        },
    };
</script>
