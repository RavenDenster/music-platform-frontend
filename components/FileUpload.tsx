import React, {useRef} from 'react'
import Globstyles from '../styles/Common.module.scss'

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children}) => {
  const ref = useRef<HTMLInputElement>()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  return (
    <div className={Globstyles.flex} onClick={() => ref.current.click()}>
        <input 
            type="file"
            accept={accept}
            style={{display: 'none'}}
            ref={ref}
            onChange={onChange}
        />
        {children}
    </div>
  )
}

export default FileUpload
