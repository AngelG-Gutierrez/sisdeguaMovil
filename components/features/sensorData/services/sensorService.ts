import { SensorDataSource } from "../dataSource/sensorDataSource";

export class SensorDataService{
    datasource:SensorDataSource;

    constructor(){
        this.datasource = new SensorDataSource();
    }

    listReal(){
        return this.datasource.listReal();
    }

    listDate(){
        return this.datasource.listDate();
    }
}