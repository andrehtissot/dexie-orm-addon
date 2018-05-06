import generateExceptionClass from './generateExceptionClass'
const MethodCalledWithoutAModelAssociatedException = generateExceptionClass("This method can only be called if this object was created from a model call")
export default MethodCalledWithoutAModelAssociatedException
