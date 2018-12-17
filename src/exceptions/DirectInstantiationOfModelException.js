import generateException from './generateException'

const DirectInstantiationOfModelException = generateException((...params) => {
    params[0] = 'Model should never be instatiated directly'
    return params
})

export default DirectInstantiationOfModelException
