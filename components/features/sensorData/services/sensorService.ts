import { SensorData } from "../entities/sensorData";

export class SensorDataService{
    sensorData:SensorData[];

    constructor(){
        this.sensorData = []
        this.add(new SensorData(90,'Alto',new Date()))
        this.add(new SensorData(80,'Alto',new Date()))
        this.add(new SensorData(40,'Medio',new Date()))
    }

    list(){
        return this.sensorData;
    }

    add(sensorData:SensorData){
        sensorData.id = this.sensorData.length + 1;
        this.sensorData.push(sensorData);
        return sensorData;
    }

    get(id:number){
        return this.sensorData.find(
            (sensorData)=>sensorData.id == id
        );
    }
}