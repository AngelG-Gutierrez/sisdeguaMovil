import { GraphicsData } from "../entities/graphicsData";

export class GraphicsService {
    private graphicsData: GraphicsData;

    constructor() {
        this.graphicsData = new GraphicsData();
    }

    async getFormattedData() {
        const sensorData = await this.graphicsData.getSensorData();

        // Transformar los datos a formato para la gráfica
        return sensorData.map(data => ({
            date: data.date.toLocaleTimeString(),  // Convertir fecha a string
            waterLevel: data.waterLevel,  // Nivel de agua
            rainLevel: data.rainLevel,    // Nivel de lluvia
        }));
    }
}