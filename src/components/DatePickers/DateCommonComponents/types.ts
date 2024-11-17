export type CustomDateElementProps = {
  date: Date;
  isSelected: boolean;
  isDisabled: boolean;
  onDayPress: (date: Date) => void;
};

export type markedDateStyle = {
  isMarked: boolean;
  markedColor: string;
  selectedDateMarkedColor: string;
};

export type dateRangeSelectionStatusType =
  | 'selected'
  | 'selecting'
  | 'notSelected';
export type startEndCurrentDatesType = {
  startDate: Date;
  endDate: Date;
  currentDate: Date;
};
