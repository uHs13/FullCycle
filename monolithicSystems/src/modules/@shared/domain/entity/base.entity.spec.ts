import Uuid from "../valueObject/uuid.value.object";
import BaseEntity from "./base.entity";

describe('Base entity unit tests', () => {
    it('Should properly create a base entity', () => {
        const uuid = new Uuid();
        const baseEntity = new BaseEntity(uuid);

        const currentDate = new Date().toLocaleDateString();

        expect(baseEntity.id.value).toStrictEqual(expect.any(String))
        expect(baseEntity.createdAt.toLocaleDateString()).toEqual(currentDate)
        expect(baseEntity.updatedAt.toLocaleDateString()).toEqual(currentDate)
    });

    it('Should properly create a base entity with provided id', () => {
        const providedUuid = '83138549-2048-4c8b-a8a2-e8009e929ebc';
        const uuid = new Uuid(providedUuid);
        const baseEntity = new BaseEntity(uuid);

        const currentDate = new Date().toLocaleDateString();

        expect(baseEntity.id.value).toStrictEqual(providedUuid)
        expect(baseEntity.createdAt.toLocaleDateString()).toEqual(currentDate)
        expect(baseEntity.updatedAt.toLocaleDateString()).toEqual(currentDate)
    });
});
