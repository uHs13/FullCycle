import RewardPointsCalculator from "./rewardPointsCalculator";

describe('Reward Points Calculator unit tests', () => {
    it('should throw an error when we try to instantiate a reward point calculator with zero as original amount', () => {
        expect(() => {
            (new RewardPointsCalculator(1, 1)).originAmount = 0;
        }).toThrow('The origin amount must be at least one');
    });

    it('should throw an error when we try to instantiate a reward point calculator with negative number as original amount', () => {
        expect(() => {
            (new RewardPointsCalculator(1, 1)).originAmount = -1;
        }).toThrow('The origin amount must be at least one');
    });

    it('should throw an error when we try to instantiate a reward point calculator with points divider that is not at least one', () => {
        expect(() => {
            new RewardPointsCalculator(0, 1);
        }).toThrow('The points divider must be at least one');
    });

    it('should throw an error when we try to instantiate a reward point calculator with zero as reward by divider', () => {
        expect(() => {
            new RewardPointsCalculator(1, 0);
        }).toThrow('The reward by divider must be greater than zero');
    });

    it('should throw an error when we try to instantiate a reward point calculator with negative number as reward by divider', () => {
        expect(() => {
            new RewardPointsCalculator(1, -1);
        }).toThrow('The reward by divider must be greater than zero');
    });

    it('should set total as zero when origin amount is lower than the points divider', () => {
        const calculator = new RewardPointsCalculator(2, 2);
        calculator.originAmount = 1;

        expect(calculator.total).toBe(0);
    });

    it('should should properly calculate the reward points total', () => {
        const calculator = new RewardPointsCalculator(2, 5);
        calculator.originAmount = 20;
        calculator.calculate();

        expect(calculator.total).toBe(50);
    });
});
