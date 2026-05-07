import type { HourlyForecastItem } from "@/data/mockWeather";
import { WeatherConditionIcon } from "@/components/icons/WeatherIcons";
import { DropletIcon, WindIcon } from "@/components/icons/UiIcons";

interface HourlyForecastProps {
  items: HourlyForecastItem[];
}

export function HourlyForecast({ items }: HourlyForecastProps) {
  return (
    <section
      aria-labelledby="hourly-forecast-title"
      className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2
            id="hourly-forecast-title"
            className="text-base font-semibold text-slate-900 sm:text-lg"
          >
            Прогноз на 24 часа
          </h2>
          <p className="text-xs text-slate-500">
            Пролистайте горизонтально, чтобы увидеть все часы
          </p>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-6">
        <ul
          role="list"
          className="no-scrollbar scroll-snap-x flex gap-3 overflow-x-auto px-4 pb-2 sm:px-6"
        >
          {items.map((item, index) => (
            <li
              key={`${item.hour}-${index}`}
              className={`flex min-w-[88px] flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${
                item.isNow
                  ? "border-blue-200 bg-blue-50/80 text-blue-900 shadow-sm"
                  : "border-slate-100 bg-white text-slate-700"
              }`}
            >
              <span
                className={`text-xs font-medium ${
                  item.isNow ? "text-blue-700" : "text-slate-500"
                }`}
              >
                {item.time}
              </span>
              <WeatherConditionIcon
                condition={item.condition}
                className="h-9 w-9"
              />
              <span className="text-lg font-semibold">{item.temperature}°</span>
              <div className="flex flex-col items-center gap-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <DropletIcon className="h-3 w-3 text-sky-500" />
                  {item.precipitation}%
                </span>
                <span className="flex items-center gap-1">
                  <WindIcon className="h-3 w-3 text-slate-400" />
                  {item.windSpeed} км/ч
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
