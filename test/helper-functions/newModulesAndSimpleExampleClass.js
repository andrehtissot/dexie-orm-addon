import newDatabase from './newDatabase'

export default async function newModulesAndSimpleExampleClass() {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    await db.open()
    return { db, ModelTest, modelTestData: ModelTest.data }
}