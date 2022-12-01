export interface DaySection {
  id: string;
  name: string;
  time: Date;
  start: Date;
  end: Date;
  overspanned?: boolean;
}