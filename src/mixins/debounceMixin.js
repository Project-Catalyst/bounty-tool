
import debounce from 'lodash.debounce'
const debounceMixin = function (methods, delayDef = 500, options = {}) {
    return {
        created() {
            const customDelay = typeof delayDef !== 'number'
            methods.forEach(m => {
                // console.log(`Debouncing ${m}`)
                const delay = customDelay
                    ? delayDef[m]
                    : delayDef
                this[m] = debounce(this[m], delay, options)
            })
        }
    }
}
export default debounceMixin