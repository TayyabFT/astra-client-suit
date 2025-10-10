import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({ label = "Date of Birth", placeholder = "16 Aug 2000", value, onChange }) => {
  return (
    <div className="space-y-2.5">
      <p className="text-xs cursor-default text-[#E0E0E0]">{label}</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: placeholder,
              sx: {
                "& .MuiInputBase-root": {
                  background: "#292929",
                  borderRadius: "8px",
                  color: "#959595",
                  fontSize: "12px",
                  padding: "10px 16px",
                  "& input": { color: "#959595" },
                  "& .MuiSvgIcon-root": { color: "#959595" },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
