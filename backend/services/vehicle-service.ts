import { db, type Vehicle } from "../database/simple-db"

export class VehicleService {
  static async getAllVehicles(companyId?: string): Promise<Vehicle[]> {
    try {
      let vehicles = db.findAll<Vehicle>("vehicles")

      if (companyId) {
        vehicles = vehicles.filter((vehicle) => vehicle.companyId === companyId)
      }

      return vehicles
    } catch (error) {
      console.error("Get vehicles error:", error)
      return []
    }
  }

  static async getVehicleById(id: string): Promise<Vehicle | null> {
    try {
      return db.findById<Vehicle>("vehicles", id)
    } catch (error) {
      console.error("Get vehicle error:", error)
      return null
    }
  }

  static async createVehicle(vehicleData: Omit<Vehicle, "id" | "createdAt">): Promise<Vehicle | null> {
    try {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...vehicleData,
        createdAt: new Date().toISOString(),
      }

      return db.create("vehicles", newVehicle)
    } catch (error) {
      console.error("Create vehicle error:", error)
      return null
    }
  }

  static async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
    try {
      return db.update("vehicles", id, updates)
    } catch (error) {
      console.error("Update vehicle error:", error)
      return null
    }
  }

  static async deleteVehicle(id: string): Promise<boolean> {
    try {
      return db.delete("vehicles", id)
    } catch (error) {
      console.error("Delete vehicle error:", error)
      return false
    }
  }
}
