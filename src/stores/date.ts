import { writable, readable, derived } from 'svelte/store';
import { getDayOfYear, setDayOfYear } from "date-fns";
import { DateType } from "$/models/DateTypeEnum";

export const dateType = writable<DateType>(DateType.auto);
export const manualDow = writable(getDayOfYear(new Date()));
export const today = readable(new Date(), set=>{
  let day_to;
  let setDayTO = () => {
    let now = new Date();
    let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    setTimeout(() => {
       set(new Date());
       setDayTO();
    }, tomorrow.getTime() - now.getTime() );
  };

  day_to = setDayTO();

  return () => clearTimeout(day_to);
});

export const date = derived(
  [ dateType, manualDow, today ],
  ([ $dateType, $manualDow, $today] )=> {
    if ($dateType === DateType.manual) {
      return setDayOfYear(new Date($today), $manualDow);
    } else {
      return $today;
    }
  }
);