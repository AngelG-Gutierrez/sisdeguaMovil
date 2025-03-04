import { SensorData } from "../../sensorData/entities/sensorData";
import { SensorDataService } from "../../sensorData/services/sensorService";

export class ProbabilityData {
    private dataSource: SensorDataService;

    constructor() {
        this.dataSource = new SensorDataService();
    }

    async getSensorData(): Promise<SensorData[]> {
        return this.dataSource.list();
    }

    async getSensorDataReal():Promise<SensorData[]>{
        return this.dataSource.listReal();
    }

    /*async getSensorDate(startDate: string, endDate: string): Promise<SensorData[]> {
        return this.dataSource.listDate(startDate, endDate);
    }*/
}