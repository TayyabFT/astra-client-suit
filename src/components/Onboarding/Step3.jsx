import React, { useState, forwardRef, useImperativeHandle } from 'react'
import CustomDropDown from '../Common/CustomDropdown'
import Input from '../Common/Input'
import TextArea from '../Common/TextArea'
import CustomCheckbox from '../Common/CustomCheckbox'
import { toast } from 'react-toastify'

const Step3 = forwardRef(({ setBusinessModel }, ref) => {
    const [formData, setFormData] = useState({
        industry: '',
        website: '',
        description: '',
        countries: '',
        riskCrypto: false,
        riskPoliticallyExposed: false,
        riskSanctions: false,
    })

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value }
        setFormData(updated)
        setBusinessModel(updated)
    }

    useImperativeHandle(ref, () => ({
        validateAndSave: () => {
            if (!formData.industry.trim()) {
                toast.error('Industry is required')
                return false
            }
            if (!formData.website.trim()) {
                toast.error('Website is required')
                return false
            }
            if (!formData.description.trim()) {
                toast.error('Description is required')
                return false
            }
            if (!formData.countries.trim()) {
                toast.error('Countries of Operation is required')
                return false
            }

            setBusinessModel(formData)
            return true
        }
    }))

    return (
        <div className='space-y-5 w-full'>
            <div className='space-y-2.5'>
                <p className='text-xs cursor-default text-[#E0E0E0]'>Industry</p>
                <CustomDropDown
                    items={['Select']}
                    placeholder='Industry'
                    className='w-full'
                    value={formData.industry}
                    onSelect={(val) => handleChange('industry', val)}
                    form
                />
            </div>

            <Input
                lable='Website URL'
                placeholder='https://'
                type='text'
                value={formData.website}
                onchange={(e) => handleChange('website', e.target.value)}
            />

            <TextArea
                lable='Description of Products'
                placeholder='Write here'
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
            />

            <div className='space-y-2.5'>
                <p className='text-xs cursor-default text-[#E0E0E0]'>Countries of Operation</p>
                <CustomDropDown
                    items={['Select']}
                    placeholder='Select'
                    className='w-full'
                    value={formData.countries}
                    onSelect={(val) => handleChange('countries', val)}
                    form
                />
            </div>

            <p className='text-xs cursor-default text-[#E0E0E0]'>Risk Questionnaire</p>
            <div className='space-y-2'>
                <CustomCheckbox
                    lable='Is your business dealing with crypto / gambling / high-risk products?'
                    checked={formData.riskCrypto}
                    onChange={(val) => handleChange('riskCrypto', val)}
                />
                <CustomCheckbox
                    lable='Are any UBOs politically exposed?'
                    checked={formData.riskPoliticallyExposed}
                    onChange={(val) => handleChange('riskPoliticallyExposed', val)}
                />
                <CustomCheckbox
                    lable='Have you ever been subject to sanctions or investigations?'
                    checked={formData.riskSanctions}
                    onChange={(val) => handleChange('riskSanctions', val)}
                />
            </div>
        </div>
    )
})

export default Step3
