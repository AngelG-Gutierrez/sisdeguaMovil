export class SensorData{
    id: number;
    waterLevel: number;
    rainIntensity: string;
    date: Date;


    constructor(waterLevel:number, rainIntensity:string, date:Date){
        this.id = 0;
        this.waterLevel = waterLevel;
        this.rainIntensity = rainIntensity;
        this.date = date;
    }
}