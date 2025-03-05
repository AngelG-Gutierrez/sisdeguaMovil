import { ProbabilityData } from "../entities/probabilityData";

export class ProbabilityService {
    private probabilityData: ProbabilityData;

    constructor() {
        this.probabilityData = new ProbabilityData();
    }

    async getFormattedData() {
        const sensorData = await this.probabilityData.getSensorData();

        return sensorData.map(data => ({
            date: new Date(data.date).toLocaleString(), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,
            rainIntensity: data.rainIntensity,  
            waterProbability: data.waterProbability,
        }));
    }

    async getFormattedDataReal() {
        const sensorData = await this.probabilityData.getSensorDataReal();

        return sensorData.map(data => ({
            date: new Date(data.date).toLocaleString(), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,
            rainIntensity: data.rainIntensity,  
            waterProbability: data.waterProbability,
        }));
    }

    async getFormattedDate() {

        const sensorData = await this.probabilityData.getSensorDate();

        return sensorData.map(data => ({
            date: new Date(data.date).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,
            rainIntensity: data.rainIntensity,  
            waterProbability: data.waterProbability,
        }));
    }
}