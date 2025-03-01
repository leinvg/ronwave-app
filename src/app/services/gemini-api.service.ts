import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiApiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const API_KEY = '';
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async getSummary(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generando contenido:', error);
      return 'No se pudo generar el resumen.';
    }
  }
}
