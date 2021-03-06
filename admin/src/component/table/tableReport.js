import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";

import axios from '../../fetch/axios'
import baseUrl from '../../fetch/baseurl'
                  
const TableReport = () => {
    const [data, setData] = useState({})
    const [row, setRow] = useState([])
    const [res, setRes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      async function fetchdata() {
        setLoading(true)
        const result =await axios.get(`${baseUrl}/report/all`)
        if(result.data.review.length !== row.length) {
            var temp  = result.data.review
            setRes(result.data.review)

            temp.map(x=> {
              // console.log(x)
              return(
                x.action = <div>
                    {x.status!=="active"?
                      <button className="btn btn-success" onClick={() => Active(x.id)}>active</button> :
                      <button className="btn btn-danger" onClick={() => Block(x.id)}>block</button> 
                    }
                  </div>
              )
            })
            setRow(temp)
        }
        else {
          const temp = {columns: columns, rows: row}
          setData(temp)
        }
        setLoading(false)
      }
      fetchdata()
    },[row, res])
  
    const Active = async(data)=> {
      setLoading(true)
      const result = await axios.post(`${baseUrl}/report/handle`, {id: data, status: "active"})
      console.log(result.data.msg)
      setLoading(false)
    }
    const Block = async (data)=> {
      setLoading(true)
      const result = await axios.post(`${baseUrl}/report/handle`, {id_owner: data, status: "deactive"})
      console.log(result.data.msg)
      setLoading(false)
    }

    return (
        <div>
        
        <LoadingMask loading={loading} text={"loading..."}>
            <div style={{ width: "100%", height: "100vh" }}>
            <MDBDataTable
                striped
                bordered
                small
                data={data}
            /></div>
        </LoadingMask>
        </div>
        
    );
}

export default TableReport

const columns = [
    {
        label: 'STT',
        field: 'id',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Post ID',
        field: 'id_post',
        width: 100
    },
    {
        label: 'Member ID',
        field: 'id_member',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Nội dung',
        field: 'content',
        sort: 'asc',
        width: 100

    },
    {
      label: 'Action',
      field: 'action',
      sort: 'asc',
      width: 100
    },
]