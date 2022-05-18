<template>
                <form action="">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Assign Bounty</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        Assigning Bounty Placeholder
                    </section>
                    <footer class="modal-card-foot">
                        <b-button label="Close" @click="$emit('close')" />
                    </footer>
                </div>
            </form>
</template>
<script>
    export default {
        name: "AssignBountyModal",
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