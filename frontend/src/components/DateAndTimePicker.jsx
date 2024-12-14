import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showTime, setShowTime] = useState(false); // Toggle for time picker
    const [time, setTime] = useState({ hours: "12", minutes: "00", period: "AM" });
  
    const handleTimeChange = (e) => {
      const { name, value } = e.target;
      setTime((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const formattedDateTime =
      selectedDate && showTime
        ? `${format(selectedDate, "MM/dd/yyyy")} ${time.hours}:${time.minutes} ${time.period}`
        : selectedDate
        ? format(selectedDate, "MM/dd/yyyy")
        : "Pick a date";
  
    return (
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 border rounded text-sm">
              {formattedDateTime}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mb-2"
            />
            {showTime && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="hours"
                  value={time.hours}
                  onChange={handleTimeChange}
                  max={12}
                  min={1}
                  className="w-12 p-1 border rounded"
                />
                :
                <input
                  type="number"
                  name="minutes"
                  value={time.minutes}
                  onChange={handleTimeChange}
                  max={59}
                  min={0}
                  className="w-12 p-1 border rounded"
                />
                <select
                  name="period"
                  value={time.period}
                  onChange={handleTimeChange}
                  className="p-1 border rounded"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            )}
            <div className="mt-2">
              <button
                className="p-1 text-sm border rounded"
                onClick={() => setShowTime((prev) => !prev)}
              >
                {showTime ? "Hide Time Picker" : "Add Time"}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };
  
  export default DateTimePicker;
  