"use client";

import { useState } from "react";
import { WeatherHero, type ForecastRange } from "@/components/weather/WeatherHero";
import { DailyForecast } from "@/components/weather/DailyForecast";
import type { CityWeatherData, HourlyForecastItem } from "@/data/mockWeather";

interface MeteoCityViewProps {
  data: CityWeatherData;
  formattedDate: string;
}

export function MeteoCityView({ data, formattedDate }: MeteoCityViewProps) {
  const [forecastRange, setForecastRange] = useState<ForecastRange>(7);
  const visibleDaily = data.daily.slice(0, forecastRange);
  const [activeIsoDate, setActiveIsoDate] = useState<string>(visibleDaily[0]?.isoDate ?? "");

  const activeDayIndex = Math.max(
    visibleDaily.findIndex((day) => day.isoDate === activeIsoDate),
    0,
  );

  const selectedHourly: HourlyForecastItem[] = data.hourly.map((hour) => ({
    ...hour,
    temperature: hour.temperature - activeDayIndex,
    precipitation: Math.min(100, hour.precipitation + activeDayIndex * 5),
    windSpeed: hour.windSpeed + Math.floor(activeDayIndex / 2),
    isNow: activeDayIndex === 0 ? hour.isNow : false,
  }));

  return (
    <div className="">
      <WeatherHero
        city={data.city}
        current={data.current}
        formattedDate={formattedDate}
        forecastRange={forecastRange}
        onForecastRangeChange={setForecastRange}
      />
      <DailyForecast
        cityName={data.city.name}
        items={visibleDaily}
        activeIsoDate={visibleDaily.some((d) => d.isoDate === activeIsoDate) ? activeIsoDate : visibleDaily[0].isoDate}
        onDaySelect={setActiveIsoDate}
        selectedHourly={selectedHourly}
        sunrise={data.details.sunrise}
        sunset={data.details.sunset}
        moonPhase={data.details.moonPhase}
        moonPhaseLabel={data.details.moonPhaseLabel}
        uvIndex={data.details.uvIndex}
        baseFeelsLike={data.current.feelsLike}
        basePressure={data.details.pressure}
        baseHumidity={data.details.humidity}
        baseAqi={data.details.aqi}
      />
    </div>
  );
}
