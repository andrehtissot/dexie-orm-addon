import Dexie from 'dexie'

declare interface IAttributeTypeOptions {
    require?: boolean
    allowNull?: boolean
}

export declare interface IAttributeType {
    validate: (value: any, options?: IAttributeTypeOptions) => boolean
}

export type BaseModelAttributeType = [string, IAttributeType, IAttributeTypeOptions]

declare interface AttributeName {
    [attributeName: string]: any
}

export declare class BaseModel {
    attributes: AttributeName[]
    constructor(attributesValues: string[], options?: { persisted: boolean })
    delete(): Promise<boolean>
    fetch(relationshipName: string): any // TODO: continue type description
    isValid: boolean
    reload(): Promise<boolean>
    save(options?: { force: boolean }): Promise<boolean>
    static attributesNames: string[]
    static attributesTypes: BaseModelAttributeType[]
    static data: any // TODO: continue type description
    static objectStoreName: string
    static primaryKeys: string[]
    static relatesTo: any // TODO: continue type description
    static save(records: BaseModel[], options?: { force: boolean }): Promise<boolean>
    static saveData(records: object[], options?: { force: boolean }): Promise<boolean>
    validate(attributesNamesToValidate: string[]): Map<string, string>
}

declare class Model extends BaseModel {
    static db: Dexie
}

declare module 'dexie' {
    const BooleanType: {
        validate: (value: boolean, options?: { require: boolean }) => boolean
    }

    const CharacterType: {
        validate: (value: string, options?: { require: boolean }) => boolean
    }

    const DateTimeType: {
        validate: (value: Date, options?: { require: boolean }) => boolean
    }

    const NumberType: {
        validate: (value: number, options?: { require: boolean }) => boolean
    }

    const IntegerType: {
        validate: (value: number, options?: { require: boolean }) => boolean
    }

    const ObjectType: {
        validate: (value: object, options?: { require: boolean; allowNull: boolean }) => boolean
    }

    const StringType: {
        validate: (value: string, options?: { require: boolean; allowNull: boolean }) => boolean
    }

    export default interface Dexie {
        Model: typeof Model
        BooleanType: typeof BooleanType
        CharacterType: typeof CharacterType
        DateTimeType: typeof DateTimeType
        NumberType: typeof NumberType
        IntegerType: typeof IntegerType
        ObjectType: typeof ObjectType
        StringType: typeof StringType
    }
}

declare const DexieORMAddon: (db: Dexie) => void

export default DexieORMAddon
