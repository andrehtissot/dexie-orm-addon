import generateException from './generateException'

const DORMWDirectMehodCallToModelException = generateException((...params) => {
    params[0] = `${params[0]} should only be called from a class that extends Model`
    return params
})

export default DORMWDirectMehodCallToModelException
