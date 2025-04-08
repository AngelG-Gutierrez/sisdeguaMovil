import { programarNotificacionLocal } from "./pushNotificationService";

// Singleton para controlar notificaciones globalmente
class NotificationManager {
  private static instance: NotificationManager;
  private lastNotificationTime: number = 0;
  private NOTIFICATION_INTERVAL = 30000;
  private isProcessing: boolean = false;

  private constructor() {}

  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  public canSendNotification(): boolean {
    const currentTime = Date.now();
    return currentTime - this.lastNotificationTime >= this.NOTIFICATION_INTERVAL && !this.isProcessing;
  }

  public async sendNotification(title: string, message: string): Promise<boolean> {
    if (!this.canSendNotification()) {
      return false;
    }

    try {
      this.isProcessing = true;
      this.lastNotificationTime = Date.now();
      
      console.log("Preparando notificación a las:", new Date().toLocaleTimeString());
      
      // Agregamos un await para asegurarnos de que se complete antes de continuar
      await programarNotificacionLocal(title, message);
      
      return true;
    } catch (error) {
      console.error("Error al enviar notificación:", error);
      return false;
    } finally {
      // Esperamos un segundo antes de permitir otra notificación
      setTimeout(() => {
        this.isProcessing = false;
      }, 1000);
    }
  }
}

export { NotificationManager };
