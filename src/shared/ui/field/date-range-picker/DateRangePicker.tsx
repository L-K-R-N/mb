import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

import calendar from "@/shared/assets/old/icons/calendar.svg";

import styles from "./DateRangePicker.module.scss";

interface DateRangePickerProps {
   value: [dayjs.Dayjs, dayjs.Dayjs];
   onChange: RangePickerProps["onChange"];
   format?: string;
   width?: number;
}

const { RangePicker } = DatePicker;

export const DateRangePicker = ({ value, width, onChange, format = "DD.MM.YY" }: DateRangePickerProps) => {
   return (
      <div style={{ width }}>
         <RangePicker
            suffixIcon={<img src={calendar} alt="" />}
            dropdownClassName={styles.dropdown}
            popupClassName={styles.popup}
            value={value}
            onChange={onChange}
            format={format}
         />
      </div>
   );
};
