import { MeasurementEnum } from '@/enums/Measurement.enum'
import { ChartDataType } from '@/types/ChartData'
import { MeasurementType } from '@/types/Measurement'

export const measurementsApi = {
  getMeasurements: async (userId: string): Promise<MeasurementType[]> => {
    const res = await fetch(
      `http://localhost:3001/api/measurements?` +
        new URLSearchParams({
          userId,
        }),
    )
    const data = await res.json()
    if (!data?.measurements) throw new Error(data.error)
    return data.measurements
  },
  addMeasurement: async (measurement: MeasurementType): Promise<MeasurementType> => {
    const newMeasurement = { ...measurement, _id: undefined }
    const res = await fetch('http://localhost:3001/api/measurements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeasurement),
    })
    const data = await res.json()

    if (!data) throw new Error(data.error)

    return data.measurement
  },
  getChartMeasurements: async (userId: string, key: MeasurementEnum): Promise<ChartDataType[]> => {
    const res = await fetch(
      `http://localhost:3001/api/measurements/${userId}/charts?` +
        new URLSearchParams({
          key,
        }),
    )

    const data = await res.json()
    if (!data?.chart) throw new Error(data.error)
    return data.chart
  },
}
