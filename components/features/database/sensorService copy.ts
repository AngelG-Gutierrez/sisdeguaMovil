import { SensorDataSource } from "../dataSource/sensorDataSource";

export class SensorDataService{
    datasource: SensorDataSource;

    constructor(){
        this.datasource = new SensorDataSource;
    }

    list(){
        return this.datasource.list();
    }

    get(id:string){
        return this.datasource.getById(id);
    }

}