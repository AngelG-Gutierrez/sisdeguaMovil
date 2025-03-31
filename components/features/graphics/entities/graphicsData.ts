import { SensorDataService } from "../../sensorData/services/sensorService";

export class GraphicsData {
    private dataSource:SensorDataService;

    constructor() {
        this.dataSource = new SensorDataService();
    }

    async getSensorDataReal(){
        return this.dataSource.listReal();
    }

    async getSensorDataTable(){
        return this.dataSource.listTable();
    }
}