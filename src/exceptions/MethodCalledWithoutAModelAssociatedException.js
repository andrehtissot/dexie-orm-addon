import generateException from './generateException'

const MethodCalledWithoutAModelAssociatedException = generateException((...params) => {
    params[0] = 'This method can only be called if this object was created from a model call'
    return params
})

export default MethodCalledWithoutAModelAssociatedException
