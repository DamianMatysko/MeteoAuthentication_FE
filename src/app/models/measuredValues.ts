import {Station} from './station';

export class MeasuredValues {
  public id: number;
  public measurementTime: string;
  public humidity: number;
  public temperature: number;
  public airQuality: number;
  public windSpeed: number;
  public windGusts: number;
  public windDirection: number;
  public rainfal: number;
  public idstation: Station;

}
