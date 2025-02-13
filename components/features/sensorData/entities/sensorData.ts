export class SensorData{
    id: number;
    waterLevel: number;
    rainLevel: number;
    rainIntensity: string;
    date: Date;


    constructor(waterLevel:number, rainLevel:number ,rainIntensity:string, date:Date){
        this.id = 0;
        this.waterLevel = waterLevel;
        this.rainLevel = rainLevel;
        this.rainIntensity = rainIntensity;
        this.date = date;
    }
}