import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'


function RTE({name, control, label, defaultValue =""}) {

  return (
    <div className='w-full '>
        {label && <label className='inline-block mb-4 pl-1'>
        {label}
        </label>}
        // controller is a spy and it tracks
        <Controller
        name = {name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor
            
            
            />
        ) }
        />
       
    </div>
  )
}

export default RTE
