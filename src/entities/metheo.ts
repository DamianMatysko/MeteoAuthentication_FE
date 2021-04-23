export class Metheo{
    constructor(
        public date: string,
        public temp: number,
        public tempMin: number,
        public tempMax: number,
        public id?: number
    ){}
}