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
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const startDateUTC = new Date(startDate.toISOString());
        const endDateUTC = new Date(endDate.toISOString());

        const sensorData = await this.probabilityData.getSensorDate(startDateUTC.toISOString(), endDateUTC.toISOString());
        console.log(startDateUTC.toISOString(), endDateUTC.toISOString());

        return sensorData.map(data => ({
            date: new Date(data.date).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }), 
            waterLevel: data.waterLevel, 
            rainLevel: data.rainLevel,
            rainIntensity: data.rainIntensity,  
            waterProbability: data.waterProbability,
        }));
    }
}