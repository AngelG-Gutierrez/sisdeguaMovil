import { SensorDataSource } from "../dataSource/sensorDataSource";

export class SensorDataService{
    datasource:SensorDataSource;

    constructor(){
        this.datasource = new SensorDataSource();
    }

    list(){
        return this.datasource.listComplete();
    }

    listReal(){
        return this.datasource.listReal();
    }

    listDate(startDate: string, endDate: string){
        return this.datasource.listDate(startDate, endDate);
    }
}