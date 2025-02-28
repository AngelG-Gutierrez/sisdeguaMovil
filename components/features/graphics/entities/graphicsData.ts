import { SensorData } from "../../sensorData/entities/sensorData";
import { SensorDataService } from "../../sensorData/services/sensorService";

export class GraphicsData {
    private dataSource:SensorDataService;

    constructor() {
        this.dataSource = new SensorDataService();
    }

    async getSensorData(): Promise<SensorData[]> {
        return this.dataSource.list();
    }

    async getSensorDataReal(): Promise<SensorData[]>  {
        return this.dataSource.listReal();
    }
}