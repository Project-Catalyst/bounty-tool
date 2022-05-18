const deleteProjectConfirmationMixin = {
    created: function(){

    },
    methods: {
        confirmDelete(toastMsg){
            const duration = 1000;
            const self = this;
            this.$buefy.dialog.confirm({
                type: "is-danger",
                title: "Delete Confirmation",
                confirmText: "DELETE",
                message:
                    "Are you sure you want to delete this project? <br/> It CANNOT be undone!<br/> (You maybe able to restore from an export)",
                onConfirm: () => {
                    self.$buefy.toast.open({
                        duration: duration,
                        message: toastMsg,
                        position: "is-top",
                        type: "is-success",
                    });

                    setTimeout(() => {
                        self.$store.commit("project/deleteProject");
                        self.$router.push("/home");
                    }, duration);
                },
            });
        }
    }
}
export default deleteProjectConfirmationMixin