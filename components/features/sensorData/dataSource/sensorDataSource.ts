import { SensorData } from "../entities/sensorData";
import { db } from "@/lib/dataStax";

export class SensorDataSource {
  
  async list(): Promise<SensorData[]> {
    try {
      const rows = await db.collection("dataSensor").find({}).toArray();
      console.log(rows);
      
      if (Array.isArray(rows)) {
        return rows.map((row: any) => new SensorData(
          row.id,
          row.waterLevel,
          row.rainLevel,
          row.rainIntensity,
          row.date
        ));
      } else {
        console.error("Los datos obtenidos no son un arreglo.");
        return [];
      }
    } catch (error) {
      console.error("Error obteniendo datos de sensores:", error);
      return [];
    }
  }

  async getById(id: string): Promise<SensorData | null> {
    try {
      // Usa db para consultar un sensor por su ID
      const result = await db.collection("dataSensor").findOne({ id });
      if (!result) return null;
      return new SensorData(result.id, result.waterLevel, result.rainLevel, result.rainIntensity, result.date);
    } catch (error) {
      console.error("Error obteniendo sensor por ID:", error);
      return null;
    }
  }
}