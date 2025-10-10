import React, { useState, forwardRef, useImperativeHandle } from 'react';
import CustomDropDown from '../Common/CustomDropdown';
import Input from '../Common/Input';
import CustomDatePicker from '../Common/CustomDatePicker';
import { toast } from 'react-toastify';

const Step2 = forwardRef(({ setPersonalDetail, initialData = {} }, ref) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    directorEmail: initialData.directorEmail || '',
    dob: initialData.dob || null,
    nationality: initialData.nationality || '',
    role: initialData.role || '',
  });

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setPersonalDetail(updated);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      if (!formData.fullName.trim()) {
        toast.error('Full Name is required');
        return false;
      }
      if (!formData.directorEmail.trim()) {
        toast.error('Director Email is required');
        return false;
      }
      if (!isValidEmail(formData.directorEmail)) {
        toast.error('Please enter a valid Director Email');
        return false;
      }
      if (!formData.dob) {
        toast.error('Date of Birth is required');
        return false;
      }
      if (!formData.nationality.trim()) {
        toast.error('Nationality is required');
        return false;
      }
      if (!formData.role.trim()) {
        toast.error('Role is required');
        return false;
      }

      setPersonalDetail(formData);
      return formData;
    },
  }));

  return (
    <div className="space-y-5 w-full">
      <Input
        lable="Full Name"
        placeholder="John Doe"
        type="text"
        value={formData.fullName}
        onchange={(e) => handleChange('fullName', e.target.value)}
      />

      <Input
        lable="Director Email"
        placeholder="director@example.com"
        type="email"
        value={formData.directorEmail}
        onchange={(e) => handleChange('directorEmail', e.target.value)}
      />

      <CustomDatePicker
        label="Date of Birth"
        placeholder="16 Aug 2000"
        value={formData.dob}
        onChange={(date) => handleChange('dob', date)}
      />

      <Input
        lable="Nationality"
        placeholder="Pakistani"
        type="text"
        value={formData.nationality}
        onchange={(e) => handleChange('nationality', e.target.value)}
      />

      <div className="space-y-2.5">
        <p className="text-xs cursor-default text-[#E0E0E0]">Role</p>
        <CustomDropDown
          items={['Director']}
          placeholder="Director"
          className="w-full"
          value={formData.role}
          onSelect={(val) => handleChange('role', val)}
        />
      </div>
    </div>
  );
});

export default Step2;
