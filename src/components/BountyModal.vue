<template>
                <form action="">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Bounty Details</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <div class="block">
                            <strong class="tag">Name:</strong> {{bounty.name}}
                        </div>
                        <div class="block">
                            <strong class="tag">Description:</strong> {{bounty.description}}
                        </div>
                        <div class="block">
                            <strong class="tag">Amount:</strong> {{bounty.amount}} ADA
                            <strong class="tag">Increment:</strong> {{ !incrementDisabled ? `${bounty.increment} ADA` : 'Increment disabled'}} 
                            <strong class="tag">IncrementPeriod:</strong> {{ !incrementDisabled ? `${bounty.incrementPeriodSize} ${bounty.incrementPeriod}(s)` : 'Increment disabled'}} 
                        </div>
                        <div class="block">
                            <strong class="tag">Review amount:</strong> {{ !reviewAmountDisabled && bounty.reviewAmount !== null ? `${bounty.reviewAmount} ADA` : 'disabled'}} 
                        </div>
                        <div class="block">
                            <strong class="tag">Admin amount:</strong> {{ !adminAmountDisabled && bounty.adminAmount !== null ? `${bounty.adminAmount} ADA` : 'disabled'}} 
                        </div>
                        <div class="block">
                            <strong class="tag">Submitter amount:</strong> {{ !submitterAmountDisabled && bounty.submitterAmount !== null ? `${bounty.submitterAmount} ADA` : 'disabled'}} 
                        </div>
                        <div class="block">
                            <strong class="tag">Level:</strong> {{bounty.level}}
                        </div>
                        <div class="block">
                            <strong class="tag">Complexity:</strong> {{bounty.complexity}}
                        </div>
                        <div class="block" v-for="(p,uuid) in bounty.properties" :key="uuid">
                            <strong class="tag">{{getPropertyName(uuid)}}</strong> {{p}}
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button label="Close" @click="$emit('close')" />
                    </footer>
                </div>
            </form>
</template>
<script>
    export default {
        name: "BountyModal",
        props: ["bounty","projectProperties"],
        methods:{
            getPropertyName(uuid){
                console.log(uuid)
                return this.projectProperties.filter( p => p.uuid === uuid)[0].name
            }
        }
    };
</script>
<style scope>
    
</style>