import Dexie from 'dexie'

declare interface IAttributeTypeOptions {
    require?: boolean
    allowNull?: boolean
    min?: number
    minLength?: number
}

export declare interface IAttributeType {
    validate: (value: any, options?: IAttributeTypeOptions) => boolean
}

export type ModelAttributeType = [string, IAttributeType, IAttributeTypeOptions]

declare interface AttributeValue {
    [attributeName: string]: any
}

export enum RelationshipType {
    one = 'one',
    first = 'first',
    last = 'last',
    all = 'all',
}

export declare type ModelRelationshipType = [RelationshipType, string, Model, string]

export declare interface ModelRelationshipTypes {
    [attributeName: string]: ModelRelationshipType
}

export declare class BaseModel {
    attributes: AttributeValue[]
    constructor(attributesValues: AttributeValue[], options?: { persisted: boolean })
    delete(): Promise<boolean>
    fetch(relationshipName: string): Promise<Model> | Promise<Collection<any, any>>
    isValid: boolean
    reload(): Promise<boolean>
    save(options?: { force: boolean }): Promise<boolean>
    static attributesNames: string[]
    static attributesTypes: ModelAttributeType[]
    static data: Table<any, any>
    static objectStoreName: string
    static primaryKeys: string[]
    static relatesTo: ModelRelationshipTypes
    static save(records: Model[], options?: { force: boolean }): Promise<boolean>
    static saveData(records: object[], options?: { force: boolean }): Promise<boolean>
    validate(attributesNamesToValidate: string[]): Map<string, string>
}

declare class Model extends BaseModel {
    static db: Dexie
}

declare const BooleanType: {
    validate: (value: boolean, options?: { require: boolean }) => boolean
}

declare const CharacterType: {
    validate: (value: string, options?: { require: boolean }) => boolean
}

declare const DateTimeType: {
    validate: (value: Date, options?: { require: boolean }) => boolean
}

declare const NumberType: {
    validate: (value: number, options?: { require: boolean }) => boolean
}

declare const IntegerType: {
    validate: (value: number, options?: { require: boolean }) => boolean
}

declare const ObjectType: {
    validate: (value: object, options?: { require: boolean; allowNull: boolean }) => boolean
}

declare const StringType: {
    validate: (value: string, options?: { require: boolean; allowNull: boolean }) => boolean
}

declare interface Collection<T, Key> extends Dexie.Collection<T, Key> {
    toInstancesArray(): Promise<Model[]>
    toMapIndexedBy(): Promise<Map<Key, object>>
    toInstancesMapIndexedBy(): Promise<Map<Key, Model>>
    firstInstance(): Promise<Model>
    lastInstance(): Promise<Model>
    sortInstancesBy(): Promise<Model[]>
}

declare interface Table<T, Key> extends Dexie.Table<T, Key> {
    toInstancesArray(): Promise<Model[]>
    toMapIndexedBy(): Promise<Map<Key, object>>
    toInstancesMapIndexedBy(): Promise<Map<Key, Model>>
    first(): Promise<object>
    firstInstance(): Promise<Model>
    last(): Promise<object>
    lastInstance(): Promise<Model>
    getInstance(): Promise<Model>
}

declare module 'dexie' {
    export interface Collection<T, Key> {}
    export interface Table<T, Key> {}

    export default class Dexie {
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
