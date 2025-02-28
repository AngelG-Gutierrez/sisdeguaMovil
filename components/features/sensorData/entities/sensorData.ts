export class SensorData{
    sensor_id: string;
    date: Date;
    waterLevel: number;
    rainLevel: number;
    rainIntensity: string;
    waterProbability:string;

    constructor(sensor_id:string,waterLevel:number, rainLevel:number, rainIntensity:string, waterProbability:string, date:Date){
        this.sensor_id = sensor_id;
        this.date = date;
        this.waterLevel = waterLevel;
        this.rainLevel = rainLevel;
        this.rainIntensity = rainIntensity;
        this.waterProbability = waterProbability;
    }
}