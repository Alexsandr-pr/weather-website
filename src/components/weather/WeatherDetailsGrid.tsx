import type { WeatherDetails } from "@/data/mockWeather";
import {
  WindIcon,
  HumidityIcon,
  PressureIcon,
  UvIcon,
  AqiIcon,
  SunriseIcon,
  SunsetIcon,
  MoonPhaseIcon,
} from "@/components/icons/UiIcons";
import { MoonIcon } from "@/components/icons/WeatherIcons";

interface DetailCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
  accent?: string;
}

function DetailCard({ label, value, hint, icon, accent = "text-blue-600 bg-blue-50" }: DetailCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className={`grid h-7 w-7 place-items-center rounded-full ${accent}`}>
          {icon}
        </span>
        {label}
      </div>
      <div>
        <div className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {value}
        </div>
        {hint && (
          <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
        )}
      </div>
    </div>
  );
}

interface WeatherDetailsGridProps {
  details: WeatherDetails;
}

export function WeatherDetailsGrid({ details }: WeatherDetailsGridProps) {
  return (
    <section
      aria-labelledby="weather-details-title"
      className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="weather-details-title"
          className="text-base font-semibold text-slate-900 sm:text-lg"
        >
          Текущие условия
        </h2>
        <p className="text-xs text-slate-500">Обновлено 5 минут назад</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <DetailCard
          label="Ветер"
          value={`${details.windSpeed} км/ч`}
          hint={details.windDirection}
          icon={<WindIcon className="h-4 w-4" />}
          accent="text-sky-600 bg-sky-50"
        />
        <DetailCard
          label="Влажность"
          value={`${details.humidity}%`}
          hint="Умеренная влажность воздуха"
          icon={<HumidityIcon className="h-4 w-4" />}
          accent="text-cyan-600 bg-cyan-50"
        />
        <DetailCard
          label="Давление"
          value={`${details.pressure} hPa`}
          hint="Стабильное"
          icon={<PressureIcon className="h-4 w-4" />}
          accent="text-indigo-600 bg-indigo-50"
        />
        <DetailCard
          label="UV-индекс"
          value={`${details.uvIndex}`}
          hint={details.uvLabel}
          icon={<UvIcon className="h-4 w-4" />}
          accent="text-amber-600 bg-amber-50"
        />
        <DetailCard
          label="Качество воздуха"
          value={`${details.aqi}`}
          hint={details.aqiLabel}
          icon={<AqiIcon className="h-4 w-4" />}
          accent="text-emerald-600 bg-emerald-50"
        />
        <DetailCard
          label="Восход солнца"
          value={details.sunrise}
          hint="Рассвет"
          icon={<SunriseIcon className="h-4 w-4" />}
          accent="text-orange-600 bg-orange-50"
        />
        <DetailCard
          label="Закат солнца"
          value={details.sunset}
          hint="Сумерки"
          icon={<SunsetIcon className="h-4 w-4" />}
          accent="text-rose-600 bg-rose-50"
        />
        <DetailCard
          label="Фаза луны"
          value={details.moonPhaseLabel}
          icon={
            <span className="grid h-4 w-4 place-items-center">
              <MoonIcon phase={details.moonPhase} className="h-4 w-4" />
            </span>
          }
          accent="text-slate-700 bg-slate-100"
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500">
        <MoonPhaseIcon className="h-4 w-4 text-slate-400" />
        <span>Видимость: {details.visibility} км</span>
      </div>
    </section>
  );
}
