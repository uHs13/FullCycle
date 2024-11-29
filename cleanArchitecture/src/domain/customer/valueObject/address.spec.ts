import Address from "./address";

describe('Address unit tests', () => {
    it('should throw an error when street is empty', () => {
        expect(() => {
            new Address('', 123, '1234ab', 'city');
        }).toThrow('Street is required');
    });

    it('should throw an error when number is zero', () => {
        expect(() => {
            new Address('street', 0, '1234ab', 'city');
        }).toThrow('Number is required');
    });

    it('should throw an error when zip code is empty', () => {
        expect(() => {
            new Address('street', 13, '', 'city');
        }).toThrow('Zip code is required');
    });

    it('should throw an error when city is empty', () => {
        expect(() => {
            new Address('street', 13, '123ab', '');
        }).toThrow('City is required');
    });
});
