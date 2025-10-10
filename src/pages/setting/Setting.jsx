import React, { useEffect, useState } from 'react'
import PasswordField from '../../components/Common/PasswordField'
import { CrossIcon, DeleteIcon, ReloadIcon } from '../../components/Svgs'
import CustomDropDown from '../../components/Common/CustomDropdown'
import ProgressBar from '../../components/Common/ProgressBar'
import Input from '../../components/Common/Input'
import CustomCheckbox from '../../components/Common/CustomCheckbox'
import TeamsandRoles from '../../components/Tables/TeamsandRoles'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const [ipList, setIpList] = useState(['']);
    const [domainList, setDomainList] = useState(['']);
    const [ipListAccess, setIpListAccess] = useState(['']);


    const handleAddIP = () => setIpList([...ipList, '']);
    const handleRemoveIP = (index) => {
        if (ipList.length > 0) {
            const newList = [...ipList];
            newList.splice(index, 1);
            setIpList(newList);
        }
    };

    const handleAddDomain = () => setDomainList([...domainList, '']);
    const handleRemoveDomain = (index) => {
        if (domainList.length > 0) {
            const newList = [...domainList];
            newList.splice(index, 1);
            setDomainList(newList);
        }
    };

    const handleAddIPAccess = () => setIpListAccess([...ipListAccess, '']);
    const handleRemoveIPAccess = (index) => {
        if (ipListAccess.length > 0) {
            const newList = [...ipListAccess];
            newList.splice(index, 1);
            setIpListAccess(newList);
        }
    };

    // Remove country
    const handleRemove = (country) => {
        const updated = supportedCountries.filter((c) => c !== country);
        setSupportedCountries(updated);
        updateCountriesToAPI(updated);
    };

    // Add new country
    const handleAdd = async () => {
        const newCountry = prompt("Enter new country code (e.g. 'UK'):");
        if (!newCountry) return;

        const updated = [...supportedCountries, newCountry.toUpperCase()];
        setSupportedCountries(updated);
        updateCountriesToAPI(updated);
    };

















    const [loading, setLoading] = useState(false)
    const [apiKey, setApiKey] = useState('')
    const [apiVersion, setApiVersion] = useState('')
    const [supportedVersions, setSupportedVersions] = useState([])
    const [dailyLimit, setDailyLimit] = useState('')
    const [monthlyLimit, setMonthlyLimit] = useState('')
    const [allowedIpAddresses, setAllowedIpAddresses] = useState([])
    const [allowedDomains, setAllowedDomains] = useState([])
    // 
    const [url, setUrl] = useState('')
    const [secret, setSecret] = useState('')
    const [retry, setRetry] = useState('4 attempts')
    const [verificationCompleted, setVerificationCompleted] = useState(false)
    const [verificationFailed, setVerificationFailed] = useState(false)
    const [securityAlerts, setSecurityAlerts] = useState(false)
    const [systemUpdates, setSystemUpdates] = useState(false)
    const [manualReview, setManualReview] = useState(false)
    const [documentUploaded, setDocumentUploaded] = useState(false)
    // 
    const [frequency, setFrequency] = useState()
    const [manual_review, setManual_review] = useState(false)
    const [document_uploaded, setDocument_uploaded] = useState(false)
    const [securitverification_failedyAlerts, setSecuritverification_failedyAlerts] = useState(false)
    const [verification_completed, setVerification_completed] = useState(false)
    // 
    const [defaultVerificationLevel, setDefaultVerificationLevel] = useState('')
    const [autoApprovalThreshold, setAutoApprovalThreshold] = useState('')
    const [passport, setPassport] = useState(false)
    const [nationalId, setNationalId] = useState(false)
    const [utilityBill, setUtilityBill] = useState(false)
    const [driversLicense, setDriversLicense] = useState(false)
    const [manualReviewTriggers, setManualReviewTriggers] = useState(false)
    const [supportedCountries, setSupportedCountries] = useState([])
    // 
    const [dataRetentionPolicy, setDataRetentionPolicy] = useState('')
    const [amlScreeningSensitivity, setAmlScreeningSensitivity] = useState('')
    const [pepMonitoring, setPepMonitoring] = useState('')
    const [auditLogAccess, setAuditLogAccess] = useState(false)
    const [ccpa, setCcpa] = useState(false)
    const [gdpr, setGdpr] = useState(false)
    const [pipeda, setPipeda] = useState(false)
    // 
    const [twoFactorAuth, setTwoFactorAuth] = useState(false)
    const [sessionTimeout, setSessionTimeout] = useState('')
    const [requireUppercase, setRequireUppercase] = useState(false)
    const [requireNumbers, setRequireNumbers] = useState(false)
    const [requireSpecialChars, setRequireSpecialChars] = useState(false)
    const [minLength, setMinLength] = useState('')



    const fetchData = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/settings/94114855-618e-4c19-866e-92d2642271b8`
            )
            const data = response.data.data;

            setApiKey(data.apiConfiguration.apiKey)
            setApiVersion(data.apiConfiguration.apiVersion)
            setSupportedVersions(data.apiConfiguration.supportedVersions || [])
            setDailyLimit(data.apiConfiguration.dailyLimit)
            setMonthlyLimit(data.apiConfiguration.monthlyLimit)
            setAllowedIpAddresses(data.apiConfiguration.allowedIpAddresses || [])
            setAllowedDomains(data.apiConfiguration.allowedDomains || [])
            // 
            const webhooks = data.webhooks || []
            if (webhooks.length > 0) {
                setUrl(webhooks[0].url)
                setSecret(webhooks[0].secret)
                setRetry(`${webhooks[0].retryConfig.maxRetries} attempts`)
                setManual_review(webhooks[0].events.manual_review)
                setDocument_uploaded(webhooks[0].events.document_uploaded)
                setSecuritverification_failedyAlerts(webhooks[0].events.securitverification_failedyAlerts)
                setVerification_completed(webhooks[0].events.verification_completed)
            }
            // 
            setFrequency(data.notification.frequency)
            setVerificationCompleted(data.notification.emailNotifications.verificationCompleted)
            setVerificationFailed(data.notification.emailNotifications.verificationFailed)
            setSecurityAlerts(data.notification.emailNotifications.securityAlerts)
            setSystemUpdates(data.notification.emailNotifications.systemUpdates)
            // 
            setDefaultVerificationLevel(data.verification.defaultVerificationLevel)
            setAutoApprovalThreshold(data.verification.autoApprovalThreshold)
            setPassport(data.verification.acceptedDocuments.passport)
            setNationalId(data.verification.acceptedDocuments.nationalId)
            setUtilityBill(data.verification.acceptedDocuments.utilityBill)
            setDriversLicense(data.verification.acceptedDocuments.driversLicense)
            setManualReviewTriggers(data.verification.manualReviewTriggers)
            setSupportedCountries(data.verification.supportedCountries)
            // 
            setDataRetentionPolicy(data.compliance.dataRetentionPolicy)
            setAmlScreeningSensitivity(data.compliance.amlScreeningSensitivity)
            setPepMonitoring(data.compliance.pepMonitoring)
            setAuditLogAccess(data.compliance.auditLogAccess)
            setCcpa(data.compliance.regionalCompliance.ccpa)
            setGdpr(data.compliance.regionalCompliance.gdpr)
            setPipeda(data.compliance.regionalCompliance.pipeda)
            // 
            setTwoFactorAuth(data.security.authentication.twoFactorAuth)
            setSessionTimeout(data.security.authentication.sessionTimeout)
            setRequireUppercase(data.security.authentication.passwordPolicy.requireUppercase)
            setRequireNumbers(data.security.authentication.passwordPolicy.requireNumbers)
            setRequireSpecialChars(data.security.authentication.passwordPolicy.requireSpecialChars)
            setMinLength(data.security.authentication.passwordPolicy.minLength)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateSetting = async () => {
        try {
            setLoading(true)

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/settings/94114855-618e-4c19-866e-92d2642271b8`,
                {
                    apiConfiguration: {
                        apiKey,
                        apiVersion,
                        supportedVersions,
                        allowedIpAddresses,
                        allowedDomains
                    },
                    webhookSettings: [
                        {
                            name: 'KYC Webhook',
                            url: url,
                            secret: secret,
                            events: {
                                manual_review,
                                document_uploaded,
                                securitverification_failedyAlerts,
                                verification_completed
                            },
                            retryConfig: {
                                maxRetries: parseInt(retry),
                                retryDelay: 1000,
                                maxRetryDelay: 30000,
                                backoffMultiplier: 2
                            }
                        }
                    ],
                    notificationSettings: {
                        frequency,
                        emailNotifications: {
                            verificationFailed,
                            verificationCompleted,
                            securityAlerts,
                            systemUpdates,
                        },
                    },
                    verificationSettings: {
                        defaultVerificationLevel,
                        autoApprovalThreshold,
                        manualReviewTriggers,
                        supportedCountries,
                        acceptedDocuments: {
                            passport,
                            driversLicense,
                            nationalId,
                            utilityBill,
                        },
                    },
                    complianceSettings: {
                        dataRetentionPolicy,
                        amlScreeningSensitivity,
                        pepMonitoring,
                        auditLogAccess,
                        regionalCompliance: {
                            ccpa,
                            gdpr,
                            pipeda
                        }
                    },
                    securitySettings: {
                        authentication: {
                            twoFactorAuth,
                            sessionTimeout,
                            passwordPolicy: {
                                minLength,
                                requireUppercase,
                                requireNumbers,
                                requireSpecialChars
                            }
                        }
                    }
                }
            )

            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }




    return (
        <div className='space-y-6'>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>API Configuration</h2>

                <div className='space-y-2.5'>
                    <p className='text-xs cursor-default text-[#E0E0E0]'>Api Key</p>
                    <div className='flex gap-2 sm:gap-5'>
                        <PasswordField value={apiKey} onchange={(e) => setApiKey(e.target.value)} placeholder='*************' />
                        <button className='rounded-lg px-3 sm:px-4 py-2 cursor-pointer text-white text-xs sm:text-[13px] text-end flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'>
                            <ReloadIcon />
                            Regenrate
                        </button>
                    </div>
                </div>

                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-2.5 flex-1'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Api Version</p>
                        <CustomDropDown
                            items={supportedVersions.length > 0 ? supportedVersions : ['1.0', '1.2']}
                            placeholder={apiVersion || 'Api Version'}
                            className='w-full'
                            form
                            onSelect={(value) => setApiVersion(value)}
                        />
                    </div>
                    <ProgressBar label='Rate Limiting (per minutes)' current={dailyLimit} max={monthlyLimit} />
                </div>

                <div className='flex gap-5 flex-col sm:flex-row'>
                    <div className='flex-1 space-y-5'>
                        <div className='space-y-2.5 w-full' >
                            <p className='text-xs cursor-default text-[#E0E0E0]'>
                                Allowed IP Address
                            </p>
                            {allowedIpAddresses.map((ip, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <Input
                                        placeholder={ip || '1.0'}
                                        value={ip}
                                        onchange={(e) => {
                                            const newIps = [...allowedIpAddresses];
                                            newIps[index] = e.target.value;
                                            setAllowedIpAddresses(newIps);
                                        }}
                                    />
                                    <span
                                        className='flex items-center justify-center size-5 cursor-pointer'
                                        onClick={() => handleRemoveIP(index)}
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p onClick={() => setAllowedIpAddresses([...allowedIpAddresses, ''])} className='cursor-pointer text-sm text-[#007BFF]'>+ Add New</p>
                    </div>
                    <div className='flex-1 space-y-5'>
                        <div className='space-y-2.5 w-full'>
                            <p className='text-xs cursor-default text-[#E0E0E0]'>
                                Allowed IP Domain
                            </p>
                            {allowedDomains.map((ip, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <Input
                                        placeholder={ip || 'example.com'}
                                        value={ip}
                                        onchange={(e) => {
                                            const newIps = [...allowedDomains];
                                            newIps[index] = e.target.value;
                                            setAllowedDomains(newIps);
                                        }}
                                    />
                                    <span
                                        className='flex items-center justify-center size-5 cursor-pointer'
                                        onClick={() => handleRemoveDomain(index)}
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p onClick={() => setAllowedDomains([...allowedDomains, ''])} className='cursor-pointer text-sm text-[#007BFF]'>+ Add New</p>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Notification Preferences</h2>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-2.5 flex-1'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Dashboard Alert Frequency</p>
                        <CustomDropDown
                            items={['immediate']}
                            placeholder={frequency}
                            className='w-full'
                            form
                            onSelect={(value) => setFrequency(value)}
                        />
                    </div>
                    <div className='flex-1 space-y-4'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Email Notifications</p>
                        <div className='flex flex-col gap-4'>
                            <CustomCheckbox
                                checked={verificationCompleted}
                                lable="Verification Success"
                                onChange={(e) => setVerificationCompleted(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={verificationFailed}
                                lable="Verification Failed"
                                onChange={(e) => setVerificationFailed(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={securityAlerts}
                                lable="Security Alerts"
                                onChange={(e) => setSecurityAlerts(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={systemUpdates}
                                lable="System Maintenance"
                                onChange={(e) => setSystemUpdates(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Verification Settings</h2>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-2.5 flex-1'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Default Verification Level</p>
                        <CustomDropDown
                            items={['Standard']}
                            placeholder={defaultVerificationLevel || 'Select'}
                            className='w-full'
                            form
                            onSelect={(value) => setDefaultVerificationLevel(value)}
                        />
                    </div>
                    <div className="flex-1 space-y-2.5">
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Supported Countries/Regions</p>
                        <div className="flex flex-wrap items-center gap-3">
                            {supportedCountries.map((itm, index) => (
                                <div
                                    key={index}
                                    className="bg-[#292929] rounded-md flex border border-[#505050] text-[#959595] items-center gap-2 text-xs px-4 py-3 cursor-pointer group hover:text-white transition-all hover:bg-[#3F6D9B] hover:border-[#3F6D9B]"
                                >
                                    {itm}
                                    <span
                                        onClick={() => handleRemove(itm)}
                                        className="size-2.5 flex items-center justify-center"
                                    >
                                        <CrossIcon className="stroke-[#959595] group-hover:stroke-white transition-all" />
                                    </span>
                                </div>
                            ))}
                            <p
                                onClick={handleAdd}
                                className="cursor-pointer text-sm text-[#007BFF]"
                            >
                                + Add New
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-5 flex-1'>
                        <div className='space-y-2.5'>
                            <p className='text-xs cursor-default text-[#E0E0E0]'>Auto-approval Thresholds</p>
                            <CustomDropDown
                                items={['High Confidence (95%+)']}
                                placeholder={autoApprovalThreshold  || 'Select'}
                                className='w-full'
                                form
                                onSelect={(value) => setAutoApprovalThreshold(value)}
                            />
                        </div>
                        <CustomCheckbox
                            checked={manualReviewTriggers}
                            lable="Manual review triggers"
                            onChange={(e) => setManualReviewTriggers(e.target.checked)}
                        />
                    </div>
                    <div className='flex-1 space-y-4'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Accepted Document Types</p>
                        <div className='flex flex-col gap-4'>
                            <CustomCheckbox
                                checked={passport}
                                lable="Passport"
                                onChange={(e) => setPassport(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={nationalId}
                                lable="National Id"
                                onChange={(e) => setNationalId(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={utilityBill}
                                lable="Utility Bill"
                                onChange={(e) => setUtilityBill(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={driversLicense}
                                lable="Drivers License"
                                onChange={(e) => setDriversLicense(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Webhook Configuration</h2>

                <div className='flex items-center gap-5 flex-col sm:flex-row'>
                    <Input
                        type='text'
                        value={url}
                        onchange={(e) => setUrl(e.target.value)}
                        lable='Webhook URL'
                        placeholder='https://apii.yourapp.com/webhookks/kyc'
                    />
                    <Input
                        type='text'
                        value={secret}
                        onchange={(e) => setSecret(e.target.value)}
                        lable='Webhook Secret'
                        placeholder='whsec*************'
                    />
                </div>

                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-2.5 flex-1'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Retry Settings</p>
                        <CustomDropDown
                            items={['3 attempts', '4 attempts', '5 attempts']}
                            placeholder={retry}
                            className='w-full'
                            form
                            onChange={(value) => setRetry(value)}
                        />
                    </div>

                    <div className='flex-1 space-y-4'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Webhook Events</p>
                        <div className='flex flex-col gap-4'>
                            <CustomCheckbox
                                checked={manual_review}
                                lable='Verification Completed'
                                onChange={(e) => setManual_review(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={document_uploaded}
                                lable='Verification Failed'
                                onChange={(e) => setDocument_uploaded(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={securitverification_failedyAlerts}
                                lable='Manual Review Required'
                                onChange={(e) => setSecuritverification_failedyAlerts(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={verification_completed}
                                lable='Document Uploaded'
                                onChange={(e) => setVerification_completed(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TeamsandRoles />
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Compliance Settings</h2>
                <div className='flex items-center gap-5 flex-col sm:flex-row'>
                    <div className='space-y-2.5 flex-1 w-full'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Data Retention Policy</p>
                        <CustomDropDown
                            items={['7_years']}
                            placeholder={dataRetentionPolicy  || 'Select'}
                            className='w-full'
                            form
                            onSelect={(value) => setDataRetentionPolicy(value)}
                        />
                    </div>
                    <div className='space-y-2.5 flex-1 w-full'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>AML Screening Sensitivity</p>
                        <CustomDropDown
                            items={['High']}
                            placeholder={amlScreeningSensitivity  || 'Select'}
                            className='w-full'
                            form
                            onSelect={(value) => setAmlScreeningSensitivity(value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='space-y-5 flex-1'>
                        <div className='space-y-2.5'>
                            <p className='text-xs cursor-default text-[#E0E0E0]'>PEP Monitoring</p>
                            <CustomDropDown
                                items={['Enabled-Real-Time']}
                                placeholder={pepMonitoring  || 'Select'}
                                className='w-full'
                                form
                                onSelect={(value) => setPepMonitoring(value)}
                            />
                        </div>
                        <CustomCheckbox
                            checked={auditLogAccess}
                            lable="Audit log access"
                            onChange={(e) => setAuditLogAccess(e.target.checked)}
                        />
                    </div>
                    <div className='flex-1 space-y-4'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Regional Compliance</p>
                        <div className='flex flex-col gap-4'>
                            <CustomCheckbox
                                checked={ccpa}
                                lable="CCPA (California)"
                                onChange={(e) => setCcpa(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={gdpr}
                                lable="GDPR (EU)"
                                onChange={(e) => setGdpr(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={pipeda}
                                lable="PIPEDA (Canada)"
                                onChange={(e) => setPipeda(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Security Settings</h2>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='flex-1 space-y-2.5'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Two-Factor Authentication</p>
                        <div className='flex gap-3'>
                            {
                                twoFactorAuth === true ?
                                    <div className='bg-[#0EAA0433] rounded-md h-full text-[#0EAA04] text-xs py-3 px-5 cursor-pointer'>
                                        Enabled
                                    </div>
                                    :
                                    <div className='p-[1px] bg-gradient-to-r from-[#919191] to-[#7F7F7F] rounded-md cursor-pointer'>
                                        <div className='bg-[#292929] rounded-md h-full text-[#FFFFFF99] text-xs w-full py-2.5 px-5'>
                                            Configure
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='space-y-2.5 flex-1'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Session Timeout</p>
                        <CustomDropDown
                            items={['30 minutes']}
                            placeholder={sessionTimeout || 'Select'}
                            className='w-full'
                            form
                            onSelect={(value) => setSessionTimeout(value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 w-full flex-col sm:flex-row'>
                    <div className='flex-1 space-y-5'>
                        <div className='space-y-2.5 w-full' >
                            <p className='text-xs cursor-default text-[#E0E0E0]'>IP Access Restrictions</p>
                            {ipListAccess.map((_, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <Input placeholder='192.168.1.1.0/24' />
                                    <span
                                        className='flex items-center justify-center size-5 cursor-pointer'
                                        onClick={() => handleRemoveIPAccess(index)}
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p onClick={handleAddIPAccess} className='cursor-pointer text-sm text-[#007BFF]'>+ Add New</p>
                    </div>
                    <div className='flex-1 space-y-4'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Password Policy Requirements</p>
                        <div className='flex flex-col gap-4'>
                            <CustomCheckbox
                                checked={minLength === 8}
                                lable="Must be 8 characters"
                                onChange={(e) => setMinLength(e.target.checked ? 8 : 0)}
                            />

                            <CustomCheckbox
                                checked={requireUppercase}
                                lable="First letter capital"
                                onChange={(e) => setRequireUppercase(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={requireNumbers}
                                lable="Use number"
                                onChange={(e) => setRequireNumbers(e.target.checked)}
                            />
                            <CustomCheckbox
                                checked={requireSpecialChars}
                                lable="Use special symbol"
                                onChange={(e) => setRequireSpecialChars(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end sm:justify-start'>
                    <div className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md h-full text-white text-xs w-full py-3 px-5 max-w-max cursor-pointer'>
                        View Login History
                    </div>
                </div>
            </div>
            <div className='flex items-end justify-end gap-3 h-full'>
                <div className='p-[1px] bg-gradient-to-r from-[#919191] to-[#7F7F7F] rounded-md cursor-pointer'>
                    <div className='bg-[#292929] rounded-md h-full text-white text-xs w-full py-2.5 px-10'>
                        Cancel
                    </div>
                </div>
                <div className='p-[1px] bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md cursor-pointer'>
                    <div onClick={updateSetting} className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md h-full text-white text-xs w-full py-2.5 px-12'>
                        {loading ? 'Loading' : 'Save'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
