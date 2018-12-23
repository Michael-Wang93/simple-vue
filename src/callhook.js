const hooks = {
    beforeCreate() {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    beforeUpdate() {
        
    },
    updated() {
        
    },
    beforeDestroy() {
        
    },
    destroyed() {
        
    }
}
export default function callhook (vm, name) {
    hooks[name].call(vm)
}