import React, { useRef, useEffect, useState } from 'react'
import { CrossIcon } from '../Svgs'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'

const FaceScanPopup = ({ onClose, capture }) => {
  const webcamRef = useRef(null)
  const [message, setMessage] = useState("Frame your face inside the circle")
  const [captured, setCaptured] = useState(null)

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    }
    loadModels()
  }, [])

  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
      const video = webcamRef.current.video
      const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())

      if (detection) {
        const { x, width } = detection.box
        const frameCenter = video.videoWidth / 2
        const faceCenter = x + width / 2

        if (faceCenter < frameCenter - 50) {
          setMessage("Move Right →")
        } else if (faceCenter > frameCenter + 50) {
          setMessage("← Move Left")
        } else {
          setMessage("Perfect! Hold Still...")
        }
      } else {
        setMessage("No face detected, look at camera")
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(detectFace, 500)
    return () => clearInterval(interval)
  }, [])

  // renamed to avoid conflict with prop
  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setCaptured(imageSrc)
      console.log("Captured Image:", imageSrc)

      // call parent callback if provided
      if (capture) {
        capture(imageSrc)
      }
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center bg-[#1111119f] bg-opacity-70 fixed top-0 z-[111111111]'>
      <div className='bg-[#7B7B7B80] p-6 rounded-2xl text-center w-[320px] backdrop-blur-[4px]'>
        <div className='flex items-center justify-end' onClick={onClose}>
          <CrossIcon className='cursor-pointer stroke-[#ffffff]' />
        </div>
        <div className='space-y-6'>
          <h2 className='text-xl text-white font-medium'>Face Scan</h2>

          <div className='flex flex-col items-center'>
            {!captured ? (
              <div className='w-40 h-40 rounded-full overflow-hidden border-2 border-[#1EA51F]'>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <img src={captured} alt="captured" className="w-40 h-40 rounded-full object-cover" />
            )}

            <p className='text-white text-xs mt-3'>{message}</p>

            {!captured && (
              <button
                onClick={handleCapture}
                className='mt-3 bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white text-xs px-6 py-2.5 rounded-md'
              >
                Capture
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaceScanPopup
