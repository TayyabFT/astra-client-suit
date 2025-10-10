import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import Input from '../Common/Input'
import CustomDropDown from '../Common/CustomDropdown'
import ImageUpload from '../Common/ImageUpload'
import { toast } from 'react-toastify'

const Syep1 = forwardRef(({ setBusinessDetail }, ref) => {
  const [formData, setFormData] = useState({
    orgName: '',
    registrationNumber: '',
    businessType: '',
    countriesOfIncorporation: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    businessProofImg: null
  })

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    setBusinessDetail(updated)
  }

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      for (let key in formData) {
        if (!formData[key] || (typeof formData[key] === 'string' && !formData[key].trim())) {
          toast.error('Please fill all required fields')
          return false
        }
      }
      setBusinessDetail(formData)
      return true
    }
  }))

  return (
    <div className='space-y-5 w-full'>
      <Input
        lable='Business Name'
        placeholder='John Doe'
        type='text'
        value={formData.orgName}
        onchange={(e) => handleChange('orgName', e.target.value)}
      />

      <Input
        lable='Registration Number'
        placeholder='A346879D'
        type='text'
        value={formData.registrationNumber}
        onchange={(e) => handleChange('registrationNumber', e.target.value)}
      />

      <div className='space-y-2.5'>
        <p className='text-xs cursor-default text-[#E0E0E0]'>Business Type</p>
        <CustomDropDown
          items={['LLC', 'Private Limited', 'Sole Proprietorship']}
          placeholder='Select Business Type'
          className='w-full'
          value={formData.businessType}
          onSelect={(val) => handleChange('businessType', val)}
        />
      </div>

      <div className='space-y-2.5'>
        <p className='text-xs cursor-default text-[#E0E0E0]'>Country of Incorporation</p>
        <CustomDropDown
          items={['UK', 'SG', 'MY', 'IN', 'AU']}
          placeholder='Select Country'
          className='w-full'
          value={formData.countriesOfIncorporation}
          onSelect={(val) => handleChange('countriesOfIncorporation', val)}
        />
      </div>

      <div className='flex gap-5'>
        <Input
          lable='Business Address'
          placeholder='Enter Street'
          type='text'
          value={formData.address}
          onchange={(e) => handleChange('address', e.target.value)}
        />
        <Input
          lable='City'
          placeholder='London'
          type='text'
          value={formData.city}
          onchange={(e) => handleChange('city', e.target.value)}
        />
      </div>

      <div className='flex gap-5'>
        <Input
          lable='Zip'
          placeholder='54190'
          type='text'
          value={formData.zip}
          onchange={(e) => handleChange('zip', e.target.value)}
        />
        <Input
          lable='Country'
          placeholder='UK'
          type='text'
          value={formData.country}
          onchange={(e) => handleChange('country', e.target.value)}
        />
      </div>

      <ImageUpload
        title='Business Proof'
        onFileSelect={(file) => {
          if (!file) {
            toast.error('Please upload business proof')
            return
          }
          handleChange('businessProofImg', file)
        }}
      />
    </div>
  )
})

export default Syep1
