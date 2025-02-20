export class SensorData{
    id: string;
    waterLevel: number;
    rainLevel: number;
    rainIntensity: string;
    waterProbability:string;
    date: Date;


    constructor(id:string,waterLevel:number, rainLevel:number, rainIntensity:string, waterProbability:string, date:Date){
        this.id = id;
        this.waterLevel = waterLevel;
        this.rainLevel = rainLevel;
        this.rainIntensity = rainIntensity;
        this.waterProbability = waterProbability;
        this.date = date;
    }
}