import { GraphicsData } from "../entities/graphicsData";

export class GraphicsService {
    private graphicsData: GraphicsData;

    constructor() {
        this.graphicsData = new GraphicsData();
    }

    async getFormattedData() {
        const sensorData = await this.graphicsData.getSensorData();

        return sensorData.map(data => ({
            date: data.date.toLocaleTimeString(), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,   
        }));
    }

    async getFormattedDataReal() {
        const sensorData = await this.graphicsData.getSensorDataReal();

        return sensorData.map(data => ({
            date: data.date.toLocaleTimeString(), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,   
        }));
    }
}