import { SensorData } from "../entities/sensorData";

export class SensorDataSource{
    sensorData:SensorData[];

    constructor(){
        this.sensorData = []
        this.add(new SensorData(90,70,'Alto',new Date()))
        this.add(new SensorData(80,60,'Alto',new Date()))
        this.add(new SensorData(40,20,'Medio',new Date()))
    }

    list(){
        return this.sensorData;
    }

    /*la inserciones las hará arduino
    esto solo es para tener datos estáticos y mostrar una función
    */
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