import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/UserPeriod.css";


const UserPeriod = ({ onPeriodChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            onPeriodChange({ startDate: start, endDate: end });
            setOpen(false);
        }
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
            {value || 'Selecciona el periodo'}
        </button>
    ));

    return (
        <div className="user-period">
            <label htmlFor="date-range-picker">Periodo:</label>
            <DatePicker
                id="date-range-picker"
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                customInput={<CustomInput />}
                dateFormat="dd/MM/yyyy"
                shouldCloseOnSelect={false}
                open={open}
                onClickOutside={() => setOpen(false)}
                onInputClick={() => setOpen(true)}
            />
        </div>
    );
};

export default UserPeriod;
