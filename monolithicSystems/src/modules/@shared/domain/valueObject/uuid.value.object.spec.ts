import Uuid from "./uuid.value.object";

describe('Uuid value object unit tests', () => {
    it('Should properly create a uuid v4 by default', () => {
        const uuid = new Uuid();

        expect(uuid.value).toStrictEqual(expect.any(String))
    });

    it('Should properly create a uuid with provided value', () => {
        const providedUuid = '03882f25-7c88-41fd-8879-a2f01a58e360';
        const uuid = new Uuid(providedUuid);

        expect(uuid.value).toStrictEqual(providedUuid);
    });
});
