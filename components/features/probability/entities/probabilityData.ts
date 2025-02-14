import { SensorDataSource } from "../../sensorData/dataSource/sensorDataSource";
import { SensorData } from "../../sensorData/entities/sensorData";

export class ProbabilityData {
    private dataSource: SensorDataSource;

    constructor() {
        this.dataSource = new SensorDataSource();
    }

    async getSensorData(): Promise<SensorData[]> {
        return this.dataSource.list();
    }
}