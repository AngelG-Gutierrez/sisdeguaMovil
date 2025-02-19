export class SensorData{
    id: string;
    waterLevel: number;
    rainLevel: number;
    rainIntensity: string;
    date: Date;


    constructor(id:string,waterLevel:number, rainLevel:number ,rainIntensity:string, date:Date){
        this.id = id;
        this.waterLevel = waterLevel;
        this.rainLevel = rainLevel;
        this.rainIntensity = rainIntensity;
        this.date = date;
    }
}