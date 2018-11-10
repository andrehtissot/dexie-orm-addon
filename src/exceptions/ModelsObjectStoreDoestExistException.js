import generateException from './generateException'

const ModelsObjectStoreDoestExistException = generateException((...params) => {
    params[0] = "Model's ObjectStore doesn't exist in this database"
    return params
})

export default ModelsObjectStoreDoestExistException
