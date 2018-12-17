import asyncTest from './helper-functions/asyncTest'
import newDatabase from './helper-functions/newDatabase'
import { deleteAllDatabasesWhenDone } from './helper-functions/deleteAllDatabases'
import { module, test } from 'QUnit'

deleteAllDatabasesWhenDone()

module('(new (extend (new Dexie(dbName).Model))).relateTo<one>')

asyncTest('simple relationship to one', async assert => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ User: 'id,personId', Person: 'id,name' })
    class Person extends Model {
        static get attributesTypes() {
            return [
                ['id', AttributeTypes.Integer, { min: 1 }],
                ['name', AttributeTypes.String, { minLength: 1 }],
                ['userId', AttributeTypes.Integer, { min: 1 }],
            ]
        }
        static get relatesTo() {
            return {
                user: ['one', 'userId', User, 'id'],
            }
        }
    }
    class User extends Model {
        static get attributesTypes() {
            return [['id', AttributeTypes.Integer, { min: 1 }], ['personId', AttributeTypes.Integer, { min: 1 }]]
        }
        static get relatesTo() {
            return {
                person: ['one', 'personId', Person, 'id'],
            }
        }
    }
    const peoplesData = [],
        peoplesDataByUserId = {},
        usersData = [],
        usersDataByPersonId = {},
        dataSize = 10
    for (let i = 1; i < dataSize; i++) {
        peoplesData.push((peoplesDataByUserId[dataSize - i] = { id: i, name: `Person ${i}`, userId: dataSize - i }))
        usersData.push((usersDataByPersonId[i] = { id: dataSize - i, personId: i }))
    }
    await Promise.all([Person.data.bulkAdd(peoplesData), User.data.bulkAdd(usersData)])
    const user0 = new User({ id: 0, personId: 0 })
    assert.equal(typeof user0.fetch, 'function', 'model instances should be able to fetch associated records')
    const person = await user0.fetch('person')
    assert.equal(person, undefined, 'user 0 should not fetch anything, since there is no person with id 0')
    for (let i = usersData.length - 1; i >= 0; i--) {
        const user = new User(usersData[i]),
            fetchedPerson = await user.fetch('person')
        assert.deepEqual(
            fetchedPerson.attributes,
            peoplesDataByUserId[user.id],
            `user ${JSON.stringify(user)} should fetch person ${JSON.stringify(fetchedPerson)}`
        )
        const fetchedUser = await fetchedPerson.fetch('user')
        assert.deepEqual(
            fetchedUser.attributes,
            usersDataByPersonId[fetchedPerson.id],
            `person ${JSON.stringify(fetchedPerson)} should fetch user ${JSON.stringify(fetchedUser)}`
        )
    }
})

module('(new (extend (new Dexie(dbName).Model))).relateTo<all>')

asyncTest('simple relationship to all', async assert => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ Game: 'id,title,personId', Person: 'id,name' })
    class Person extends Model {
        static get attributesTypes() {
            return [['id', AttributeTypes.Integer, { min: 0 }], ['name', AttributeTypes.String, { minLength: 1 }]]
        }
        static get relatesTo() {
            return {
                games: ['all', 'id', Game, 'personId'],
            }
        }
    }
    class Game extends Model {
        static get attributesTypes() {
            return [
                ['id', AttributeTypes.Integer, { min: 0 }],
                ['title', AttributeTypes.String, { minLength: 1 }],
                ['personId', AttributeTypes.Integer, { min: 0 }],
            ]
        }
    }
    const peoplesData = [],
        dataSize = 4,
        gamesData = [],
        gamesDataByPersonId = {}
    for (let i = 0; i < dataSize; i++) {
        peoplesData.push({ id: i, name: `Person ${i}` })
        gamesDataByPersonId[i] = []
        for (let j = i * dataSize; j < (1 + i) * dataSize; j++) {
            gamesDataByPersonId[i].push({ id: j, title: `Game ${j}`, personId: i })
            gamesData.push({ id: j, title: `Game ${j}`, personId: i })
        }
    }
    await Promise.all([Person.data.bulkAdd(peoplesData), Game.data.bulkAdd(gamesData)])
    const person99 = new Person({ id: 99, name: 'Person 99' })
    assert.equal(typeof person99.fetch, 'function', 'model instances should be able to fetch associated records')
    const games = await person99.fetch('games').toArray()
    assert.deepEqual(games, [], 'person99 should fetch an empty array, since there is no games with personId 99')
    for (let i = peoplesData.length - 1; i >= 0; i--) {
        const person = new Person(peoplesData[i]),
            fetchedGames = await person.fetch('games').toArray()
        assert.deepEqual(
            fetchedGames,
            gamesDataByPersonId[person.id],
            `person ${JSON.stringify(person)} should fetch the games ${JSON.stringify(fetchedGames)}`
        )
    }
})

module('(new (extend (new Dexie(dbName).Model))).relateTo<first and last>')

asyncTest('simple relationship to all', async assert => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ Game: 'id,title,personId', Person: 'id,name' })
    class Person extends Model {
        static get attributesTypes() {
            return [['id', AttributeTypes.Integer, { min: 0 }], ['name', AttributeTypes.String, { minLength: 1 }]]
        }
        static get relatesTo() {
            return {
                firstGame: ['first', 'id', Game, 'personId'],
                lastGame: ['last', 'id', Game, 'personId'],
            }
        }
    }
    class Game extends Model {
        static get attributesTypes() {
            return [
                ['id', AttributeTypes.Integer, { min: 0 }],
                ['title', AttributeTypes.String, { minLength: 1 }],
                ['personId', AttributeTypes.Integer, { min: 0 }],
            ]
        }
    }
    const peoplesData = [],
        dataSize = 4,
        gamesData = [],
        gamesDataByPersonId = {}
    for (let i = 0; i < dataSize; i++) {
        peoplesData.push({ id: i, name: `Person ${i}` })
        gamesDataByPersonId[i] = []
        for (let j = i * dataSize; j < (1 + i) * dataSize; j++) {
            gamesDataByPersonId[i].push({ id: j, title: `Game ${j}`, personId: i })
            gamesData.push({ id: j, title: `Game ${j}`, personId: i })
        }
    }
    await Promise.all([Person.data.bulkAdd(peoplesData), Game.data.bulkAdd(gamesData)])
    const person99 = new Person({ id: 99, name: 'Person 99' })
    assert.equal(typeof person99.fetch, 'function', 'model instances should be able to fetch associated records')
    const firstGame = await person99.fetch('firstGame'),
        lastGame = await person99.fetch('lastGame')
    assert.deepEqual(
        firstGame,
        undefined,
        'person99 should not fetch anything, since there is no game with personId 99'
    )
    assert.deepEqual(lastGame, undefined, 'person99 should not fetch anything, since there is no game with personId 99')
    for (let i = peoplesData.length - 1; i >= 0; i--) {
        const person = new Person(peoplesData[i]),
            fetchedFirstGame = await person.fetch('firstGame'),
            fetchedLastGame = await person.fetch('lastGame')
        assert.deepEqual(
            fetchedFirstGame.attributes,
            gamesDataByPersonId[person.id][0],
            `person ${JSON.stringify(person)} should fetch the game ${JSON.stringify(fetchedFirstGame.attributes)}`
        )
        assert.deepEqual(
            fetchedLastGame.attributes,
            gamesDataByPersonId[person.id][3],
            `person ${JSON.stringify(person)} should fetch the game ${JSON.stringify(fetchedLastGame.attributes)}`
        )
    }
})
