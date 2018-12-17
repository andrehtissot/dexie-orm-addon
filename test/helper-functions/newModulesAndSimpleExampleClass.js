import newDatabase from './newDatabase'

export default async function newModulesAndSimpleExampleClass() {
    const db = newDatabase(),
        { Model, IntegerType, StringType } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [['id', IntegerType, { min: 1 }], ['name', StringType, { minLength: 1 }]]
        }
    }
    await db.open()
    return { db, ModelTest, modelTestData: ModelTest.data }
}
