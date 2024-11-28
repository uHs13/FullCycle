export default class RewardPointsCalculator {
    private _originAmount: number = 0;
    private _pointsDivider: number;
    private _rewardByDivider: number;
    private _total: number = 0;

    constructor(pointsDivider: number, rewardByDivider: number) {
        this._pointsDivider = pointsDivider;
        this._rewardByDivider = rewardByDivider;

        this.validate();
    }

    set originAmount(originAmount: number) {
        if (originAmount <= 0) {
            throw new Error('The origin amount must be at least one');
        }

        this._originAmount = originAmount;
    }

    get total(): number {
        return this._total;
    }

    validate(): void {
        if (this._pointsDivider < 1) {
            throw new Error('The points divider must be at least one');
        }

        if (this._rewardByDivider <= 0) {
            throw new Error('The reward by divider must be greater than zero');
        }
    }

    calculate(): void {
        if (this._originAmount < this._pointsDivider) {
            this._total = 0;
            return;
        }

        let multiplier = Math.trunc(this._originAmount / this._pointsDivider);

        this._total = this._rewardByDivider * multiplier;
    }
}
