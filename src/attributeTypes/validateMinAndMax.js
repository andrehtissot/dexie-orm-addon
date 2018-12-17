export default function validateMinAndMax(value, options) {
    if (!options) {
        return
    }
    if (options.min !== undefined && value < options.min) {
        throw 'is lower than mininum'
    }
    if (options.max !== undefined && value > options.max) {
        throw 'is higher than maximum'
    }
}
