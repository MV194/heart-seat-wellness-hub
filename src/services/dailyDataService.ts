
export interface DailyHealthData {
  date: string;
  tiredness: number;
  steps: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  nutrition: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    vitaminC: number;
    iron: number;
  };
}

export class DailyDataService {
  private static STORAGE_KEY = 'hospital_daily_data';

  static getTodaysData(): DailyHealthData {
    const today = new Date().toISOString().split('T')[0];
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    const allData: Record<string, DailyHealthData> = storedData ? JSON.parse(storedData) : {};
    
    return allData[today] || this.getDefaultDayData(today);
  }

  static getWeekData(): DailyHealthData[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    const allData: Record<string, DailyHealthData> = storedData ? JSON.parse(storedData) : {};
    
    const weekData: DailyHealthData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weekData.push(allData[dateStr] || this.getDefaultDayData(dateStr));
    }
    
    return weekData;
  }

  static updateTodaysData(updates: Partial<Omit<DailyHealthData, 'date'>>): void {
    const today = new Date().toISOString().split('T')[0];
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    const allData: Record<string, DailyHealthData> = storedData ? JSON.parse(storedData) : {};
    
    const currentData = allData[today] || this.getDefaultDayData(today);
    allData[today] = { ...currentData, ...updates };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
  }

  private static getDefaultDayData(date: string): DailyHealthData {
    return {
      date,
      tiredness: Math.floor(Math.random() * 5) + 3, // 3-7 range
      steps: Math.floor(Math.random() * 5000) + 6000, // 6000-11000 range
      caloriesConsumed: Math.floor(Math.random() * 400) + 1600, // 1600-2000 range
      caloriesBurned: Math.floor(Math.random() * 400) + 2000, // 2000-2400 range
      nutrition: {
        protein: Math.floor(Math.random() * 30) + 70, // 70-100%
        carbs: Math.floor(Math.random() * 40) + 60, // 60-100%
        fats: Math.floor(Math.random() * 30) + 65, // 65-95%
        fiber: Math.floor(Math.random() * 50) + 40, // 40-90%
        vitaminC: Math.floor(Math.random() * 20) + 80, // 80-100%
        iron: Math.floor(Math.random() * 40) + 50, // 50-90%
      }
    };
  }

  static simulateDailyStepUpdate(): void {
    const currentData = this.getTodaysData();
    const stepIncrement = Math.floor(Math.random() * 100) + 50; // 50-150 steps
    this.updateTodaysData({
      steps: Math.min(currentData.steps + stepIncrement, 12000)
    });
  }

  static simulateNutritionUpdate(mealType: 'breakfast' | 'lunch' | 'dinner'): void {
    const currentData = this.getTodaysData();
    const nutritionBoost = {
      breakfast: { protein: 15, carbs: 20, vitaminC: 10 },
      lunch: { protein: 25, carbs: 25, fiber: 15 },
      dinner: { protein: 20, carbs: 20, iron: 15, fats: 15 }
    };

    const boost = nutritionBoost[mealType];
    const updatedNutrition = { ...currentData.nutrition };
    
    Object.entries(boost).forEach(([key, value]) => {
      updatedNutrition[key as keyof typeof updatedNutrition] = Math.min(
        updatedNutrition[key as keyof typeof updatedNutrition] + value,
        100
      );
    });

    this.updateTodaysData({ nutrition: updatedNutrition });
  }
}
