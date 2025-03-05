import { SensorData } from "../../sensorData/entities/sensorData";
import { SensorDataService } from "../../sensorData/services/sensorService";

export class ProbabilityData {
    private dataSource: SensorDataService;

    constructor() {
        this.dataSource = new SensorDataService();
    }

    async getSensorDataReal():Promise<SensorData[]>{
        return this.dataSource.listReal();
    }

    async getSensorDate(): Promise<SensorData[]> {
        return this.dataSource.listDate();
    }
}