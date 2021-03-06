import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik' 
import { FormInput } from "../FormInput"
import axios from '../../fetch/axios'

// id_member , id_post , content
const AddTimeNews = ({id_post, id_owner}) => {

    const handleSendReport =async (data) =>{
        console.log(data)
        // api them thong bao nay vao bang `thongbao`
        let res = await axios.post("/report/giahan", data)
        alert(res.data.msg)
    }

    const { handleSubmit, handleChange, errors, touched} = useFormik({
        initialValues: {
            description: '',
            duration: '',
        },
        validationSchema: Yup.object({
            description: Yup.string()
            .required("Không được để trống trường này")
            .min(10, 'Độ dài tối thiểu là 10')
            .max(250, 'Tối đa 250 ký tự'),
            duration: Yup.number().required("Phải nhâp số ngày cần gia hạn")
        }),
        onSubmit: (values)=> {
            console.log(values)
            let data = {
                content: values.description + "muon them: "+  values.duration + " ngay",
                id_owner: id_owner,
                id_post: id_post,
                duration: values.duration,
            }
            handleSendReport(data)
        }
    })
    return (
        <>
            <form action= "" onSubmit={handleSubmit}>
                <FormInput
                    name="duration"
                    onChange={handleChange}
                    label="Bạn muốn gia hạn thêm bao lâu? "
                    required={true}
                    error={errors.duration}
                    type="number"
                    touched={touched.duration}
                />
                <FormInput
                    typeInput="textaria"
                    name="description"
                    onChange={handleChange}
                    label="Lời nhắn "
                    required={true}
                    placeholder="Nhắn  ..."
                    error={errors.description}
                    touched={touched.description}
                />
                <button type="submit" className="btn btn-danger">Thông báo gia hạn tin</button>
            </form>
        </>
    )
}
export default AddTimeNews