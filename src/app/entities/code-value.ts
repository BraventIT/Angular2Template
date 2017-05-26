export class CodeValue {

    public code: number;
    public value: string;

    constructor(item?: any) {
        this.code = item && item.code ? item.code : -1;
        this.value = item && item.value ? item.value : '';
    }
}
